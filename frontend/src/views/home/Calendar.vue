<template>
  <div class="main">
    <section class="glass"> 
      <div class="data">
        <div class="header">
          <!-- Ausgabe des formatierten Datepicker-Datums bei setup() der Komponente -->
          <h1> Meine Belege vom {{pickedDate}} </h1>
        </div>
        <div class="window">
          <p> Hier sollen die Belege aufgelistet werden. </p>
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
          <button class="button" @click="updateDate" type="button">Belege anzeigen</button> <br>
        </div>
        <div class="info">
          <p> Belegsumme </p>
          <div>
            <!-- Hier soll die berechnete Belegsumme angezeigt werden. -->
            <input type="text" v-model="sum" placeholder="belegsumme"> 
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
      pickedDate: this.format(new Date()),
      sum: 0,
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
    /* 3 Teilschritte beim Betätigen des Abschicken-Buttons:
      - Anpassung des Headers (format()-Methode)
      - Abruf der Belege aus der Datenbank & Anzeigen in Listenform (showReceipts()-Methode)
      - Ausrechnen der Belegsumme & Darstellung im Fenster rechts unten  */
    updateDate() {
      this.pickedDate = this.format(this.picked);
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
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #1b4332;
  display: flex;
  align-items: center;
  justify-content: center;
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

.calendarview {
  
}

.info {
  
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
  border: 1px solid black;
  height: 85%;
  width: auto;
  background: white;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  color: black;
  border-radius: 2rem;
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

button a {
    color: #081c15;
    text-decoration: none;
    text-transform: uppercase;
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

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

</style>