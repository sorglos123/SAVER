<template>
  <div class="basic">
    <main>
      <section class="glass">
        <form>
          <br> <h1> Bitte geben Sie Ihre persönlichen Daten ein! </h1> <br>
          <input type="text" name="username" v-model="username" autocomplete="off" placeholder="Benutzername"><br><br>
          <input type="text" name="email" v-model="email" autocomplete="off" placeholder="E-Mail-Adresse"><br><br>
          <input type="password" name="passwd" v-model="passwd" placeholder="Passwort"><br><br>
          <input type="password" name="confirm" v-model="confirm" placeholder="Passwort bestätigen"><br><br>
          <br> <div class="error" v-html="error"></div> <br>
          <button class="button" @click="register" type="button">Registrierung abschließen</button>
        </form>
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
      username: '',
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
          username: this.username,
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
  background: linear-gradient(to right top, #40916c, #74c69d);
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
  top: 10%;
  left: 10%;
  z-index: 2;
}

.circle2 {
  bottom: 5%;
  right: 10%;
  z-index: 2;
}

.button {
  background: linear-gradient(to right top, #40916c, #74c69d);
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
