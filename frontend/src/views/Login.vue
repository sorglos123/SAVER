<template>
  <div class="hello">
    <main>
      <section class="glass">
        <div class="header">
        <br> <h1> Willkommen bei SAVER </h1> <br>
        </div>
        <div class="board">
          <div class="infotext">
            <div>
              <p> Diese Anwendung dient der Speicherung, Analyse und Verarbeitung von Kassenzetteln, 
              Rechnungen und anderen Kaufbelegen. Sie wurde von Sascha Richter und Benjamin Krause 
              im Rahmen des Softwareprojektes im Studiengang Informatik an der BA Leipzig entwickelt. 
              </p>
            </div>
          </div>
          <div class="form">
            <form @submit.prevent="login()">
              <br> <h3> Bitte loggen Sie sich ein: </h3> <br>
              <input v-model="email" name="email" id="email" placeholder="E-Mail-Adresse"><br><br>
              <input v-model="passwd" name="passwd" id="passwd" placeholder="Passwort"><br><br>
              <button class="button" type="submit">Login</button> <br>
              <br> <p> Sie haben noch kein Benutzerkonto? </p>
              <button class="button" type="submit">
                <router-link to="Register"> Registrieren </router-link>
              </button> <br>
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
import LoginService from '@/services/LoginService'
export default {
  data () {
    return {
      email: '',
      passwd: '',
    }
  },
  methods: {
    async login() {
        await LoginService.login({
        email: this.email,
        passwd: this.passwd,
      });
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
}

.header {
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem 2rem 0rem 0rem;
  /* margin: 2rem 0rem; */
  padding: 1rem 3rem;
  color: #386928;
}

.board {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  color: #386928
}

.infotext {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0rem;
  padding: 1rem 3rem;
  color: #386928
}

.form {
  flex: 2;
  display: flex;
  margin: 2rem 0rem;
  padding: 1rem 3rem;
  color: #386928
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
  bottom: 5%;
  left: 12%;
  z-index: 2;
}

.circle2 {
  top: 10%;
  right: 12%;
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

</style>
