<template>
  <div class="basic">
    <h1> Registrierung </h1>
    <input type="email" name="email" v-model="email" placeholder="E-Mail-Adresse"><br><br>
    <input type="passwd" name="passwd" v-model="passwd" placeholder="Passwort"><br><br>
    <button @click="register">Registrieren</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      passwd: ''
    }
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        passwd: this.passwd
      });
      console.log(response.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
