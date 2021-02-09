<template>
    <main>
        <div class="bar">
            <div class="title">
                <button class="button">
                    <!-- Falls User nicht eingeloggt: Weiterleitung zum Login -->
                    <!-- Falls User eingeloggt: Weiterleitung zu Home -->
                    <router-link to="/"> <h1> SAVER </h1> </router-link>
                </button>
                <button class="button">
                    <router-link to="/user"> [benutzername] </router-link>
                </button>
            </div>
            <!-- TODO: Zeige die Buttons Login/Registrierung nur an, wenn der Benutzer nicht eingeloggt ist -> Store -->
            <div class="buttons">
                <button class="button">
                    <!-- Siehe oben: Weiterleitung zu Home soll über SAVER-Button erfolgen -->
                    <router-link to="Home"> HOME </router-link>
                </button>
                <button class="button">
                    <router-link to="/"> Login </router-link>
                </button>
                <button class="button">
                    <router-link to="Register"> Registrierung </router-link>
                </button>
                <!-- Diesen Button nur zeigen, wenn man sich eingeloggt hat! -->
                <button class="button">
                    <router-link to="/"> Logout </router-link>
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
    display: flex;
    align-items: right;
    justify-content: flex-end;
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