<template>
    <main>
        <div class="sidebar">
            <div class="title"> </div>
            <div class="menu-items">
                <button class="button" @click="navigateTo('/dashboard')" type="button"> Home </button>
                <button class="button" @click="navigateTo('/receipts')" type="button"> Meine Belege </button>
                <button class="button" @click="navigateTo('/calendar')" type="button"> Mein Kalender </button>
                <button class="button" @click="navigateTo('/statistics')" type="button"> Meine Statistiken </button>
                <button class="button" @click="navigateTo('/user')" type="button"> Meine Benutzerdaten </button>
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

.bar {
    margin: 0;
    padding: 0;
    background: #1b4332;
    color: white;
    width: 100%;
    width: 8px;
    height: auto;
    height: 100%;
    display: flex;
    position: fixed;
    overflow: auto;
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
    .sidebar {
    width: 30px;
    height: auto;
    position: relative;
    }

    .button {
    background: #1b4332;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 8px;
    font-weight: bolder;
    margin: 4px 2px;
    cursor: pointer;
}
}
</style>