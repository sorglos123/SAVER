<template>
    <main>
        <div class="bar">
            <div class="title">
                <h1> SAVER </h1>
            </div>
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
    background: #1b4332;
    color: white;
    height: 80px;
    width: auto;
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

@media screen and (max-width: 700px) {
    h1 {
        padding: 0px 0px 10px 10px;
        margin: 4px 4px;
    }
    
    .bar {
        margin: 0 auto;
        background: #1b4332;
        color: white;
        width: auto;
        height: 50px;
        display: flex;
        justify-content: center;
    }

    .title {
        flex: 1;
        display: flex;
        align-items: right;
        justify-content: center;
    }

    .buttons {
        flex: 1;
    }

    .button {
        background: #1b4332;
        border: none;
        color: white;
        padding: 14px 7.5px 10px 7.5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        font-weight: bolder;
        margin: 4px;
        cursor: pointer;
        text-transform: uppercase;
        height: 30px;
    }
}
</style>