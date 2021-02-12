<template>
  <div class="hello">
    <section class="glass">
      <form>
        <br> <h1> Persönliche Daten ändern </h1> <br>
        <input type="text" name="username" v-model="username" autocomplete="off" placeholder="Benutzername"><br><br>
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
    <div class="circle3"></div>
    <div class="circle4"></div>
  </div>
</template>

<script>
import UpdateService from '@/services/UpdateService'
export default {
  data () {
    return {
      username: '',
      email: '',
      oldpw: '',
      newpw: '',
      confirm: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await UpdateService.updateUser({
          username: this.username,
          email: this.email,
          oldpw: this.oldpw,
          newpw: this.newpw,
          confirm: this.confirm
        });
        // this.$store.dispatch('setUser', response.data.user);
        // this.$store.dispatch('setToken', response.data.token);
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
  margin: 40px 10px;
  cursor: pointer;
}

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

</style>
