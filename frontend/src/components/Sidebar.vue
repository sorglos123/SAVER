<template>
    <main>
        <div class="sidebar">
            <div class="title"> </div>
            <div class="menu-items">
                <button class="full-button" @click="navigateTo('/dashboard')" type="button"> Home </button>
                <button class="short-button" @click="navigateTo('/dashboard')" type="button"> Home </button>
                <button class="full-button" @click="navigateTo('/receipts')" type="button"> Meine Belege </button>
                <button class="short-button" @click="navigateTo('/receipts')" type="button"> Belege </button>
                <button class="full-button" @click="navigateTo('/calendar')" type="button"> Mein Kalender </button>
                <button class="short-button" @click="navigateTo('/calendar')" type="button"> Kalender </button>
                <button class="full-button" @click="navigateTo('/statistics')" type="button"> Meine Statistiken </button>
                <button class="short-button" @click="navigateTo('/statistics')" type="button"> Statistiken </button>
                <button class="full-button" @click="navigateTo('/user')" type="button"> Meine Benutzerdaten </button>
                <button class="short-button" @click="navigateTo('/user')" type="button"> Daten </button>
                <!-- 
                <button class="button">
                    <router-link to="/dashboard" active-class="active" tag="button"> 
                        <div class="link-container">
                            Home
                        </div> 
                    </router-link>
                </button>
                <button class="button">
                    <router-link to="/receipts" active-class="active" tag="button"> 
                        <div class="link-container">
                            Meine Belege
                        </div> 
                    </router-link>
                </button>
                <button class="button">
                    <router-link to="/calendar" active-class="active" tag="button"> 
                        <div class="link-container">
                            Mein Kalender
                        </div> 
                    </router-link>
                </button>
                <button class="button">
                    <router-link to="/statistics" active-class="active" tag="button"> 
                        <div class="link-container">
                            Meine Statistiken
                        </div> 
                    </router-link>
                </button>
                <button class="button">
                    <router-link to="/user" active-class="active" tag="button"> 
                        <div class="link-container">
                            Meine Benutzerdaten
                        </div> 
                    </router-link>
                </button> -->
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
    }
}
</script>

<style scoped>
.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
}

button a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
}

.sidebar {
    width: auto;
    height: 100%;
    position: relative;
}

.full-button {
  background: #1b4332;
  border: none;
  color: white;
  padding: 30px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  margin: 4px 2px;
  cursor: pointer;
  text-transform: uppercase;
}

.short-button {
    display: none;
}

.button:hover {
    background: #081c15;
}

@media screen and (max-width: 700px) {
    .menu-items {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    .sidebar {
        width: auto;
        height: 100%;
        position: relative;
    }

    .short-button {
        background: #1b4332;
        border: none;
        color: white;
        padding: 47px 8px;
        text-align: center;
        display: inline-block;
        font-size: 10px;
        margin: 2px 1px;
        cursor: pointer;
        text-transform: uppercase;
    }

    .full-button {
        display: none;
    }
}
</style>