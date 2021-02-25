<template>
    <div class="main">
      <section class="glass">
        <div class="options">
          <div class="header">
          <h1> Meine Statistiken </h1>
          </div>
          <div class="list">
            <label for="statistic">Bitte wähle eine der verfügbaren Statistiken zur Aufbereitung deiner Daten aus: </label> <br>
            <input list="statistics" name="statistic" id="statistic" v-model="choice" @change="nullDisplay">
              <datalist id="statistics">
                <option value="Tagesumsatz pro Verkaufsstelle (in %)"/>
                <option value="Umsatz über einen Zeitraum pro Verkaufsstelle (in %)"/>
              </datalist>
          </div>
          <div class="configuration">
            <p> <u> Weitere Konfigurationsoptionen </u> </p>
            <div v-if="choice === 'Tagesumsatz pro Verkaufsstelle (in %)'">
              <span> Bitte wähle ein Datum aus: </span>
              <datepicker
              v-model="simplePicked"
              :locale="locale"
              :inputFormat="inputFormat"
              >
              </datepicker>
            </div>
            <div v-if="choice === 'Umsatz über einen Zeitraum pro Verkaufsstelle (in %)'">
              <span> Von: </span>
              <datepicker
              v-model="beginComplexPicked"
              :locale="locale"
              :inputFormat="inputFormat"
              >
              </datepicker>
              <span> Bis: </span>
              <datepicker
              v-model="endComplexPicked"
              :locale="locale"
              :inputFormat="inputFormat"
              >
              </datepicker>
            </div>
          </div>
          <button class="button" @click="updateDiagram" type="button">Statistik anzeigen</button> <br>
        </div>
        <div class="diagram">
          <p> {{selectorChoice}} </p>  
          <p v-if="choice === 'Tagesumsatz pro Verkaufsstelle (in %)'"> vom {{simpleDate}} </p>
          <p v-if="choice === 'Umsatz über einen Zeitraum pro Verkaufsstelle (in %)'"> vom {{beginComplexDate}} bis {{endComplexDate}} </p>
        </div>
      </section>
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
    </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import { ref } from 'vue';
import { de } from 'date-fns/locale';

export default {
  name: 'Statistics',
  components: {
    Datepicker
  },
  setup() {
    const simplePicked = ref(new Date());
    const beginComplexPicked = ref(new Date());
    const endComplexPicked = ref(new Date());
    const locale = de;
    const inputFormat = "dd.MM.yyyy";

    return {
      simplePicked,
      beginComplexPicked,
      endComplexPicked,
      locale,
      inputFormat,
    }
  },
  data () {
    return {
      choice: '',
      begin: '',
      end: '',
      selectorChoice: '',
      simpleDate: this.format(new Date()),
      beginComplexDate: this.format(new Date()),
      endComplexDate: this.format(new Date())
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
    updateDiagram() {
      this.selectorChoice = this.choice;
      this.simpleDate = this.format(this.simplePicked);
      this.beginComplexDate = this.format(this.beginComplexPicked);
      this.endComplexDate = this.format(this.endComplexPicked);
    },
    nullDisplay() {
      this.selectorChoice = null;
      this.simpleDate = null;
      this.beginComplexDate = null;
      this.endComplexDate = null;
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

.options {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  padding: 20px;
}

.list {
  padding: 20px;
}

.configuration {
  padding: 20px;
}

.diagram {
  flex: 1;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-size: 12px;
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
    width: 80%;
    flex-direction: column;
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