<template>
    <main>
        <div class="bar">
            <div class="title">
                <h1> SAVER </h1>
                <!-- <button class="button"> -->
                    <!-- Falls User nicht eingeloggt: Weiterleitung zum Login -->
                    <!-- Falls User eingeloggt: Weiterleitung zu Home -->
                    <!-- <router-link to="/"> <h1> SAVER </h1> </router-link> -->
                <!-- </button> -->
            </div>
            <!-- TODO: Zeige die Buttons Login/Registrierung nur an, wenn der Benutzer nicht eingeloggt ist -> Store -->
            <div class="buttons">
                <button class="button" @click="navigateTo({name: 'login'})" type="button" v-if="!$store.state.isUserLoggedIn"> Login </button>
                <button class="button" @click="navigateTo({name: 'register'})" type="button" v-if="!$store.state.isUserLoggedIn"> Registrierung </button>
                <button class="button" @click="logout" type="button" v-if="$store.state.isUserLoggedIn"> Logout </button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        logout() {
            this.$store.dispatch('setToken', null);
            this.$store.dispatch('setUser', null);
            this.$router.push({name: 'login'});
        }
    }
}
</script>

<style scoped>

h1 {
    padding: 0px 10px 50px 50px;
}

button a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
}

.bar {
    margin: 0 auto;
    background: #1b4332;
    color: white;
    width: auto;
    height: 80px;
    display: flex;
}

.title {
    flex: 1;
    display: flex;
    align-items: right;
    justify-content: center;
}

.buttons {
    flex: 6;
    display: flex;
    align-items: right;
    justify-content: flex-end;
    vertical-align: middle;
}

.button {
  background: #1b4332;
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
  text-transform: uppercase;
}

.button:hover {
    background: #081c15;
}
</style>