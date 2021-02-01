<template>
  <div class="basic">
    <main>
      <section class="glass">
        <button class="button" type="submit">
                <router-link to="Login"> Zurück zur Login-Seite </router-link>
        </button> <br>
        <br> <h1> Bitte geben Sie Ihre persönlichen Daten ein! </h1> <br>
        <input type="lastname" name="lastname" v-model="lastname" placeholder="Nachname"><br><br>
        <input type="firstname" name="firstname" v-model="firstname" placeholder="Vorname"><br><br>
        <input type="email" name="email" v-model="email" placeholder="E-Mail-Adresse"><br><br>
        <input type="passwd" name="passwd" v-model="passwd" placeholder="Passwort"><br><br>
        <input type="confirm" name="confirm" v-model="confirm" placeholder="Passwort bestätigen"><br><br>
        <br> <div class="error" v-html="error"></div> <br>
        <button class="button" @click="register">Registrierung abschließen</button>
      </section>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      lastname: '',
      firstname: '',
      email: '',
      passwd: '',
      confirm: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          passwd: this.passwd,
          confirm: this.confirm
        });
      } catch(error) {
          this.error = error.response.data.error;
      }
    }
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

main {
  min-height: 85vh;
  /* background: linear-gradient(to right top, #65dfc9, #6cdbeb); */
  background: linear-gradient(to right top, #55e08b, #78e055);
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass {
  background: white;
  min-height: 55vh;
  width: 60%;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #386928;
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
  top: 10%;
  left: 10%;
  z-index: 2;
}

.circle2 {
  bottom: 10%;
  right: 10%;
  z-index: 2;
}

.button {
  background: linear-gradient(to right top, #55e08b, #78e055);
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
