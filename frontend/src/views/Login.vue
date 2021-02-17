<template>
  <div class="main">
    <main>
      <section class="glass">
        <div class="header">
          <br> <h1 style="text-align:center"> Willkommen bei SAVER </h1> <br>
        </div>
        <div class="board">
          <div class="info">
            <div class="text">
              <!-- Text eventuell auflockern; Schriftart insgesamt verändern -> etwas lockerer, runder! -->
              <p> SAVER speichert deine Kassenbons, Rechnungen und anderen Kaufbelege und hilft dir über 
              verschiedene Analysen und Auswertungen dabei, einen Überblick über dein Kaufverhalten zu behalten.
              </p>
              <p style="font-weight: bold"> Unter dem Strich kannst du mit SAVER also bares Geld sparen. </p> 
            </div>
            <div class="pictures">
              <div class="pic">
                <img class="fit" src="@/assets/img/vuejs.png" alt="">
              </div>
              <div class="pic"> </div>
              <div class="pic">
                <img class="fit" src="@/assets/img/nodejs.svg" alt="">
              </div>
              <div class="pic"> </div>
            </div>
            <div class="pictures">
              <div class="pic"> </div>
              <div class="pic">
                <img class="fit" src="@/assets/img/mariadb.png" alt="">
              </div>
              <div class="pic"> </div>
              <div class="pic">
                <img class="fit" src="@/assets/img/docker.svg" alt="">
              </div>
            </div>
          </div>
          <div class="form">
            <form >
              <br> <h3> Bitte loggen Sie sich ein: </h3> <br>
              <input type="text" v-model="email" name="email" id="email" placeholder="E-Mail-Adresse"><br><br>
              <input type="password" v-model="passwd" name="passwd" id="passwd" placeholder="Passwort"><br><br>
              <button class="button" @click="login" type="button">Login</button> <br>
              <br> <div class="error" v-html="error"></div> <br>
              <br> <p> Noch kein Benutzerkonto? </p>
              <button class="button" @click="navigateTo({name: 'register'})" type="button"> Registrierung </button>
            </form>
          </div>
        </div>
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
      email: '',
      passwd: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          passwd: this.passwd,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/dashboard');
      } catch(error) {
        this.error = error.response.data.error;
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
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
}

.header {
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem 2rem 0rem 0rem;
  padding: 1rem 3rem;
  color: #1b4332;
  text-shadow: 5px 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  color: #1b4332
}

.info {
  flex: 2;
  margin: 1rem 0rem;
  padding: 0rem 1rem;
  color: #1b4332;
}

.text {
  flex: 1;
}

.pictures {
  flex: 1;
  padding: 0px 10px 0px 50px;
  display: flex;
  align-items: center;
  justify-content: center; 
}

.pic {
  padding: 10px 25px 10px 12.5px;
  height: 100%;
  width: auto;
}

.fit {
  object-fit: scale-down;
  height: 50px;
}

.form {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0rem;
  padding: 0rem 1rem;
  color: #1b4332
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
  bottom: 2%;
  left: 12%;
  z-index: 2;
}

.circle2 {
  top: 10%;
  right: 12%;
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
  cursor: pointer;
}

button a {
    color: white;
    text-decoration: none;
}

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

</style>
