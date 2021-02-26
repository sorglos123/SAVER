<template>
    <div class="main">
      <section class="glass">
        <div class="upper">
          <div class="upload">
            <button class="button" @click="navigateTo('/upload')" type="button"> Neuen Beleg hochladen </button>
          </div>
          <div class="header">
              <h1> Meine Belegübersicht </h1>
          </div>
          <div class="options">
            <div class="filter">
              <p> Meine Belege <b> durchsuchen </b> nach: </p> <br>
              <input type="radio" id="store_filter" value="Verkaufsstelle" v-model="filter_criterion"> <br>
              <label for="store">Verkaufsstelle</label> <br>
              <input type="radio" id="value_filter" value="Belegsumme" v-model="filter_criterion"> <br>
              <label for="value">Belegsumme</label> <br> <br>
                <div v-if="filter_criterion === 'Verkaufsstelle'" class="store">
                  <input class="input" type="text" name="filter_store" v-model="filter_store" autocomplete="off" placeholder="Verkaufsstelle"> <br>
                </div>
                <div v-if="filter_criterion === 'Belegsumme'" class="value">
                  <input type="radio" id="less" value="less" v-model="choice">
                  <label for="less">Weniger als</label>
                  <span> oder </span>
                  <input type="radio" id="more" value="more" v-model="choice">
                  <label for="more">Mehr als</label> <br>
                  <input class="input" type="text" name="filter_value" v-model="filter_value" autocomplete="off" placeholder="Belegsumme"> Euro <br>
                </div> <br>
                <button class="button" @click="filterList()" type="button">Belege durchsuchen</button> <br>
            </div>
            <div class="sort">
              <p> Meine Belege <b> sortieren </b> nach: </p> <br>
              <input type="radio" id="store_search" value="Verkaufsstelle" v-model="search_criterion"> <br>
              <label for="store">Verkaufsstelle</label> <br>
              <input type="radio" id="value_search" value="Belegsumme" v-model="search_criterion"> <br>
              <label for="value">Belegsumme</label> <br>
              <input type="radio" id="date_search" value="Belegdatum" v-model="search_criterion"> <br>
              <label for="value">Belegdatum</label> <br> <br>
              <button class="button" @click="sortList()" type="button">Belege sortieren</button> <br>
            </div>
          </div>
          <button class="button" @click="deleteReceipts(); getReceipts()" type="button">Belege anzeigen / Filter zurücksetzen</button> <br>
        </div>
        <div class="window">
          <div class="receiptlist"
            v-for="receipt in receipts"
            :key="receipt.id"
            :date="receipt.receiptDate"
            :store="receipt.receiptStore"
            :value="receipt.receiptValue">
            <div class="store"> {{receipt.id}}. {{receipt.receiptStore}} </div>
            <div class="value"> {{receipt.receiptValue}} Euro </div>
            <div class="date"> {{receipt.receiptDate}} </div>
          </div>
        </div>
      </section> 
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
    </div>
</template>

<script>
import ListService from '@/services/ListService'
export default {
  data () {
    return {
      selectedFile : '',
      filter_criterion: '',
      search_criterion: '',
      filter_store: '',
      choice: '',
      filter_value: '',
      receipts: [
      ],
      receiptDate: '',
      receiptValue: 0,
      receiptStore: '',
      nextReceiptID: 0,
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    displayFile() {
      this.selectedFile = document.getElementById('receipt').files[0];
      console.log(this.selectedFile);
    },
    format(timestamp) {
      const dateString = timestamp.toString();
      const dateElements = dateString.split('-');
      var day = dateElements[2].split('T')[0];
      var tmp = day.concat('.', dateElements[1], '.', dateElements[0]);
      return tmp;
    },
    async getReceipts() {
      this.nextReceiptID = 0;      
      try {
        const response = await ListService.queryUserList({
          uid: this.$store.state.userID
        });
        
        // Add the elements of the actual DB query
        for(var j=0; j<response.data.receipts.length; j++) {
          this.addReceipt(response.data.receipts[j]);
        }
      } catch(error) {
        this.error = error.response.data.error;
      }
    },
    deleteReceipts() {
      // Delete the elements of former method calls
      this.receipts.splice(0, this.receipts.length);
    },
    addReceipt(rcp) {
      this.nextReceiptID++;
      this.receipts.push({
        id: this.nextReceiptID,
        receiptStore: rcp.supermarket,
        receiptValue: this.formatEnglishCurrencyGerman(rcp.total_value),
        receiptDate: this.format(rcp.receipt_date)
      })
      this.receiptDate = '';
      this.receiptStore = '';
      this.receiptValue = 0;
    },
    filterList() {
      if(this.filter_criterion === 'Verkaufsstelle') {
        this.choice = null;
        this.filter_value = null;

        // Remove elements from receipt list, when their receiptStore matches the given filter_store
        this.receipts = this.receipts.filter(receipt => receipt.receiptStore == this.filter_store);
      } else if(this.filter_criterion === 'Belegsumme') {
        this.filter_store = null;
        
        // Remove elements from receipt list, when their receiptValue matches the given 
        // upper or lower limit (filter_value)
        if(this.choice === "less") {
            this.receipts = this.receipts.filter(receipt => parseFloat(this.formatGermanCurrencyEnglish(receipt.receiptValue)) < parseInt(this.filter_value));
        } else if(this.choice === "more") {
            this.receipts = this.receipts.filter(receipt => parseFloat(this.formatGermanCurrencyEnglish(receipt.receiptValue)) > parseInt(this.filter_value));
        }
      }
    },
    sortByStore(a,b) {
      if ( a.receiptStore < b.receiptStore ){
        return -1;
      }
      if ( a.receiptStore > b.receiptStore ){
        return 1;
      }
      return 0;
    },
    sortByValue(a,b) {
      if ( parseFloat(a.receiptValue) < parseFloat(b.receiptValue) ){
        return -1;
      }
      if ( parseFloat(a.receiptValue) > parseFloat(b.receiptValue) ){
        return 1;
      }
      return 0;
    },
    sortByDate(a,b) {
      var a_dateElements = a.receiptDate.split('.');
      var b_dateElements = b.receiptDate.split('.');
      if ( a_dateElements[2] < b_dateElements[2] ) {
        return -1;
      } else if ( (a_dateElements[2] == b_dateElements[2]) && (a_dateElements[1] < b_dateElements[1]) ) {
        return -1;
      } else if ( (a_dateElements[2] == b_dateElements[2]) && (a_dateElements[1] == b_dateElements[1]) && (a_dateElements[0] < b_dateElements[0]) ) {
        return -1;
      }
      if ( a_dateElements[2] > b_dateElements[2] ) {
        return 1;
      } else if ( (a_dateElements[2] == b_dateElements[2]) && (a_dateElements[1] > b_dateElements[1]) ) {
        return 1;
      } else if ( (a_dateElements[2] == b_dateElements[2]) && (a_dateElements[1] == b_dateElements[1]) && (a_dateElements[0] > b_dateElements[0]) ) {
        return 1;
      }
      return 0;
    },
    sortList() {
      if(this.search_criterion === 'Verkaufsstelle') {
        this.receipts = this.receipts.sort(this.sortByStore);
      } else if(this.search_criterion === 'Belegsumme') {
        this.receipts = this.receipts.sort(this.sortByValue);
      } else if(this.search_criterion === 'Belegdatum') {
        this.receipts = this.receipts.sort(this.sortByDate);
      }
    },
    formatEnglishCurrencyGerman(currency) {
      const values = currency.toString().split('.');
      var euro = values[0];
      var tmp = euro.concat(',',values[1]);
      return tmp;
    },
    formatGermanCurrencyEnglish(currency) {
      const value = currency.toString().split(',');
      var dollar = value[0];
      var tmp = dollar.concat('.',value[1]);
      return tmp;
    },
  },
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.upper {
  width: 100%;
}

.upload {
  min-height: 10vh;
  width: 100%;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem 2rem 0rem 0rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #1b4332;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, #bbd2c5, #536976, #292e49);
  color: white;
  padding: 10px;
}

.upload button {
  border-radius: 2rem 2rem 2rem 2rem;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  color: black;
}

.main {
  min-height: 85vh;
  height: auto;
  background: linear-gradient(to right top, #40916c, #74c69d);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
}

.glass {
  min-height: 65vh;
  width: 60%;
  height: auto;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #1b4332;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0px;
}

.header {
  header: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.options {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
}

.filter {
  flex: 1;
  width: 100%;
  height: auto;
}

.sort {
  flex: 1;
  width: 100%;
  height: auto;
}

.data {
  flex: 2;
  height: 400px;
  width: auto;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.window {
  width: 100%;
  height: 30vh;
  background: white;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  color: black;
  border-radius: 0rem 0rem 2rem 2rem;
}

.receiptlist {
  display: flex;
  align-items: center;
  justify-content: center;
}

.store {
  flex: 1;
  text-align: left;
}

.value {
  flex: 1;
  text-align: middle;
}

.date {
  flex: 1;
  text-align: right;
}

.button {
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: none;
  color: white;
  padding: 7.5px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: bolder;
  margin: 2px 1px;
  cursor: pointer;
}

button a {
    color: #081c15;
    text-decoration: none;
    text-transform: uppercase;
}

.circle1, .circle2, .circle3, .circle4 {
  background: white;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
  position: absolute;
  border-radius: 50%;
}

.circle1 {
  width: 15rem;
  height: 15rem;
  bottom: 3%;
  left: 45%;
  z-index: 2;
}

.circle2 {
  width: 22rem;
  height: 22rem;
  top: 17%;
  right: 5%;
  z-index: 2;
}

.circle3 {
  width: 20rem;
  height: 20rem;
  top: 22%;
  left: 19%;
  z-index: 2;
}

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

@media screen and (max-width: 700px) {
  .glass {
    width: 90%;
  }

  .filter {
    flex: 2;
    width: 100%;
    height: auto;
  }

  .sort {
    flex: 1;
    width: 100%;
    height: auto;
  }

  .filter {
    flex: 1;
  }

  .input {
    width: 80%;
  }
  
  .circle1 {
    width: 10rem;
    height: 10rem;
    bottom: 1%;
    left: 55%;
    z-index: 2;
  }

  .circle2 {
    width: 16rem;
    height: 16rem;
    top: 38%;
    left: 25%;
    z-index: 2;
  }

  .circle3 {
    width: 11rem;
    height: 11rem;
    top: 10%;
    left: 55%;
    z-index: 2;
  }
}

</style>