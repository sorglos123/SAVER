<template>
  <div class="hello">
    <div class="menu">
      Willkommen bei SAVER!
    </div>
    <div class="boxes">
      <div class="box" id="info">
        <div class="infotext">
          Diese Anwendung dient der Speicherung, Analyse und Verarbeitung von Kassenzetteln, Rechnungen und anderen Kaufbelegen. 
          Sie wurde von Sascha Richter und Benjamin Krause im Rahmen des Softwareprojektes im Studiengang Informatik an der BA Leipzig 
          entwickelt.
        </div>
        <div class="pictures">
          <div class="pic" id="sascha">
            <img src="../assets/img/crash.png" class="picture">
          </div>
          <div class="pic" id="benni">
            <img src="../assets/img/coco.png" class="picture"> 
          </div>
        </div>
      </div>
      <div class="box" id="form">
        <div>
          <div class="header">
            Bitte loggen Sie sich ein:
          </div>
          <div class="form">
              <form @submit.prevent="login()">
              <br>
              <input v-model="username" name="username" id="username" placeholder="E-Mail-Adresse"><br><br>
              <input v-model="passwd" name="passwd" id="passwd" placeholder="Passwort"><br><br>
              <button type="submit">Login</button>
              <p> Sie haben noch kein Benutzerkonto? </p>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO"> Dann klicken Sie hier! </a>
            </form>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #1F2F16;
  height: 10vh;
  font-weight: bolder;
  border: 3px solid #5A7684;
  border-radius: 10px;
}
.boxes {
  justify-content: center;
  align-items: center;
  height: 85vh;
  width: auto;
}
.box {
  border: 3px solid #5A7684;
  border-radius: 10px;
  margin: 10px;
  width: 30 vw;
  background: #8FA998;
  color: white;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
.infotext {
  text-align: block;
  margin: 20px;
}
.pictures {
  display: flex;
  align-items: center; 
  vertical-align: middle;
  justify-content: space-around;
  margin: 10px;
}
.pic {
  height: auto;
  width: auto;
  margin: 5px;
}
.form {
  margin: 5px;
}

</style>
