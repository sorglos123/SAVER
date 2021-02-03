<template>
    <main>
        <div class="bar">
            <div class="title">
                <button class="button">
                    <router-link to="/"> <h1> SAVER </h1> </router-link>
                </button>
            </div>
            <!-- TODO: Zeige die Buttons Login/Registrierung nur an, wenn der Benutzer nicht eingeloggt ist -> Store -->
            <div class="buttons">
                <button class="button">
                    <router-link to="Login"> Login </router-link>
                </button>
                <button class="button">
                    <router-link to="Register"> Registrierung </router-link>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
export default {

}
</script>

<style scoped>

button a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
}

.bar {
    margin: 0 auto;
    background: #1b4332;
    color: white;
    width: 100%;
    height: auto;
    display: flex;
}

.title {
    flex: 1;
}

.buttons {
    flex: 3;
    display: flex;
    align-items: right;
    justify-content: flex-end;
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
}

.button:hover {
    background: #081c15;
}
</style>