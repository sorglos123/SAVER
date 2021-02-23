<template>
  <div class="main">
    <section class="glass"> 
      <div class="data">
        <div class="header">
          <!-- Ausgabe des formatierten Datepicker-Datums bei setup() der Komponente -->
          <h1> Meine Belege vom </h1> 
          <h1> {{headerDate}} </h1>
        </div>
        <div class="window">
          <div class="receiptlist"
            v-for="receipt in receipts"
            :key="receipt.id"
            :store="receipt.receiptStore"
            :value="receipt.receiptValue">
            <div class="store"> {{receipt.id}}. {{receipt.receiptStore}} </div>
            <div class="value"> {{receipt.receiptValue}} </div>
          </div>
        </div>
      </div>
      <div class="calendarcontainer">
        <div class="calendarview">
          <p> Wähle ein Datum aus: </p>
          <datepicker
            v-model="picked"
            :locale="locale"
            :inputFormat="inputFormat"
          >
          </datepicker>
          <button class="button" @click="deleteReceipts(); updateDate(); getReceipts()" type="button">Belege anzeigen</button> <br>
        </div>
        <div class="info">
          <p> Belegsumme </p>
          <div>
            <input type="text" v-model="sum"> 
          </div>
        </div>
      </div>
    </section>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import { ref } from 'vue';
import { de } from 'date-fns/locale';
import ListService from '@/services/ListService'

export default {
  name: 'Calendar',
  components: {
    Datepicker
  },
  setup() {
    const picked = ref(new Date());
    const locale = de;
    const inputFormat = "dd.MM.yyyy";

    return {
      picked,
      locale,
      inputFormat,
    }
  },
  data () {
    return {
      headerDate: this.format(new Date()),
      pickedDate: new Date(),
      receipts: [
        /* {
          id: 0,
          receiptStore: 'Kaufland',
          receiptValue: '1,11 €'
        },
        {
          id: 1,
          receiptStore: 'LIDL',
          receiptValue: '2,22 €'
        } */
      ],
      receiptValue: 0,
      receiptStore: '',
      nextReceiptID: 0, 
      sum: '',
      error: null
    }
  },
  methods: {
    format(timestamp) {
      const dateString = timestamp.toString();
      const dateElements = dateString.split(' ');
      var day = dateElements[2];
      var tmp = day.concat('. ', dateElements[1], ' ', dateElements[3]);
      return tmp;
    },
    formatForDB(timestamp) {
      const timeString = timestamp.toString();
      const elements = timeString.split(' ');
      var year = elements[3];
      var month;
      switch(elements[1]) {
        case 'Jan':
          month = '01';
          break;
        case 'Feb':
          month = '02';
          break;
        case 'Mar':
          month = '03';
          break;
        case 'Apr':
          month = '04';
          break;
        case 'Mai':
          month = '05';
          break;
        case 'Jun':
          month = '06';
          break;
        case 'Jul':
          month = '07';
          break;
        case 'Aug':
          month = '08';
          break;
        case 'Sep':
          month = '09';
          break;
        case 'Oct':
          month = '10';
          break;
        case 'Nov':
          month = '11';
          break;
        case 'Dec':
          month = '12';
          break;
      }
      var tmp = year.concat('-', month, '-', elements[2]);
      return tmp;
    },
    formatCurrency(currency) {
      const values = currency.toString().split('.');
      var euro = values[0];
      var tmp = euro.concat(',',values[1],' Euro');
      return tmp;
    },
    updateDate() {
      this.pickedDate = this.picked;
      this.headerDate = this.format(this.picked);
    },
    async getReceipts() {
      this.nextReceiptID = 0;
      try {
        const response = await ListService.queryList({
          receiptDate: this.formatForDB(this.pickedDate),
          uid: this.$store.state.userID
        });
        
        // Add the elements of the actual DB query
        for(var j=0; j<response.data.receipts.length; j++) {
          this.addReceipt(response.data.receipts[j]);
        }
        
        // Evaluate the sum of all array elements
        var tmpSum = 0;
        for(var k=0; k<response.data.receipts.length; k++) {
          tmpSum += response.data.receipts[k].total_value;
          this.sum = this.formatCurrency(tmpSum.toString());
        }
      } catch(error) {
        this.error = error.response.data.error;
      }
    },
    deleteReceipts() {
      // Delete the elements of former method calls
      this.receipts.splice(0, this.receipts.length);
      this.sum = '';
    },
    addReceipt(rcp) {
      this.nextReceiptID++;
      this.receipts.push({
        id: this.nextReceiptID,
        receiptStore: rcp.supermarket,
        receiptValue: this.formatCurrency(rcp.total_value)
      })
      this.receiptStore = '';
      this.receiptValue = 0;
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

.main {
  min-height: 85vh;
  height: auto;
  background: linear-gradient(to right top, #40916c, #74c69d);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.glass {
  min-height: 55vh;
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
  margin: 10px 0px;
}

.calendarcontainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  width: auto;
  border-radius: 2rem;
}

.header {
  padding: 20px;
}

.data {
  flex: 2;
  height: 340px;
  width: auto;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.window {
  height: 85%;
  width: auto;
  background: white;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  color: black;
  border-bottom-left-radius: 2rem;
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
  text-align: right;
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

.button {
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  margin: 4px 2px;
  margin: 40px 10px;
  cursor: pointer;
}

button a {
    text-decoration: none;
    text-transform: uppercase;
}

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

@media screen and (max-width: 700px) {
  .glass {
    width: 90%;
    flex-direction: column;
  }

  .header {
    padding: 10px;
  }

  .info {
    padding: 10px 0px;
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