<template>
    <div class="main">
      <section class="glass">
        <div class="upper">
          <div class="upload">
            <button class="button">
              <router-link to="/upload"> Neuen Beleg hochladen </router-link>
            </button>
          </div>
          <div class="header">
              <h1> Meine Belegübersicht </h1>
          </div>
          <div class="options">
            <div class="filter">
              <p> Meine Belege <b> durchsuchen </b> nach: </p> <br>
              <input type="radio" id="store_filter" value="Verkaufsstelle" v-model="filter_criterion">
              <label for="store">Verkaufsstelle</label> <br>
              <input type="radio" id="value_filter" value="Belegsumme" v-model="filter_criterion">
              <label for="value">Belegsumme</label> <br> <br>
                <div v-if="filter_criterion === 'Verkaufsstelle'" class="store">
                  <span> <b> Verkaufsstelle: </b> </span>
                  <input type="text" name="filter_store" v-model="filter_store" autocomplete="off" placeholder="Verkaufsstelle"> <br>
                </div>
                <div v-if="filter_criterion === 'Belegsumme'" class="value">
                  <span> <b> Belegsumme: </b> </span> <br>
                  <input type="radio" id="less" value="Weniger als " v-model="choice">
                  <label for="less">Weniger als</label>
                  <span> oder </span>
                  <input type="radio" id="more" value="Mehr als " v-model="choice">
                  <label for="more">Mehr als</label> <br>
                  <span> <b> {{ choice }} </b> </span> 
                  <input type="text" name="filter_value" v-model="filter_value" autocomplete="off" placeholder="Belegsumme"> Euro <br>
                </div> <br>
              <!-- <button class="button" @click="filterListBy(filter_criterion, filter_store, choice, filter_value)">Belege durchsuchen</button> <br> -->
                <button class="button" @click="filterList()">Belege durchsuchen</button> <br>
            </div>
            <div class="sort">
              <p> Meine Belege <b> sortieren </b> nach: </p> <br>
              <input type="radio" id="store_search" value="Verkaufsstelle" v-model="search_criterion">
              <label for="store">Verkaufsstelle</label> <br>
              <input type="radio" id="value_search" value="Belegsumme" v-model="search_criterion">
              <label for="value">Belegsumme</label> <br> <br>
              <button class="button" @click="sortList()">Belege sortieren</button> <br>
            </div>
          </div>
        </div>
        <div class="window">
          <!-- Dieses div reagiert aktuell auf den File-Upload! Allerdings soll es ja auf die Filterung/
          Sortierung reagieren, das muss noch angepasst werden. -->
          <p> Hier sollen die Belege aufgelistet werden. </p>
          <!-- Zugriff auf die verschiedenen v-models per {{ selectedFile.name }} oder {{ filter_criterion }} -->
          {{filter_criterion}}
          {{search_criterion}}
          {{filter_store}}
          {{choice}}
          {{filter_value}}
        </div>
      </section> 
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile : '',
      filter_criterion: '',
      search_criterion: '',
      filter_store: '',
      choice: '',
      filter_value: '',
    }
  },
  methods: {
    displayFile() {
      this.selectedFile = document.getElementById('receipt').files[0];
      console.log(this.selectedFile);
    },
    filterList() {
      if(this.filter_criterion === 'Verkaufsstelle') {
        this.choice = null;
        this.filter_value = null;
        console.log("Filtern nach: " + this.filter_criterion);
        console.log("Verkaufsstelle: " + this.filter_store);
        console.log("Mehr/weniger als: " + this.choice);
        console.log("Belegsumme: " + this.filter_value);
      } else if(this.filter_criterion === 'Belegsumme') {
        this.filter_store = null;
        console.log("Filtern nach: " + this.filter_criterion);
        console.log("Verkaufsstelle: " + this.filter_store);
        console.log("Mehr/weniger als: " + this.choice);
        console.log("Belegsumme: " + this.filter_value);
      }
    },
    sortList() {
      if(this.search_criterion === 'Verkaufsstelle') {
        console.log("Sortiert nach Verkaufsstelle");
      } else if(this.search_criterion === 'Belegsumme') {
        console.log("Sortiert nach Belegsumme");
      }
    }
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
}

.filter {
  flex: 1;
}

.sort {
  flex: 1;
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

</style>