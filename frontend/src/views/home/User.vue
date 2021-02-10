<template>
  <div class="hello">
    <section class="glass">
      <form>
        <br> <h1> Persönliche Daten ändern </h1> <br>
        <input type="text" name="lastname" v-model="lastname" autocomplete="off" placeholder="Nachname"><br><br>
        <input type="text" name="firstname" v-model="firstname" autocomplete="off" placeholder="Vorname"><br><br>
        <input type="text" name="email" v-model="email" autocomplete="off" placeholder="E-Mail-Adresse"><br><br>
        <input type="password" name="oldpw" v-model="passwd" placeholder="Aktuelles Passwort"><br><br>
        <input type="password" name="newpw" v-model="confirm" placeholder="Neues Passwort"><br><br>
        <input type="password" name="confirm" v-model="confirm" placeholder="Neues Passwort bestätigen"><br><br>
        <br> <div class="error" v-html="error"></div> <br>
        <button class="button" @click="updateUser">Abschicken</button>
      </form>
    </section>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lastname: '',
      firstname: '',
      email: '',
      oldpw: '',
      newpw: '',
      confirm: '',
      error: null
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hello {
  min-height: 85vh;
  height: auto;
  background: linear-gradient(to right top, #40916c, #74c69d);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.glass {
  background: white;
  min-height: 55vh;
  width: 60%;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #1b4332;
}

.circle1, .circle2 {
  background: white;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
  width: 20rem;
  height: 20rem;
  position: absolute;
  border-radius: 50%;
}

.circle1 {
  bottom: 0%;
  left: 22%;
  z-index: 2;
}

.circle2 {
  top: 15%;
  right: 12%;
  z-index: 2;
}

.button {
  background: linear-gradient(to right top, #40916c, #74c69d);;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  margin: 4px 2px;
  cursor: pointer;
}

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

</style>
