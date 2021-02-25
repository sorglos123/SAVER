<template>
    <div class="main">
      <div class="upper">
        <div class="upper-left">
           <div class="glass">
              <div class="card">
                <div class="icon"> 
                  <div class="fill1"> 
                  </div>
                </div>
                <div class="link">
                  <button class="button" @click="navigateTo('/receipts')" type="button"> Meine Belege </button>
                  <div class="text"> 
                    <p> Übersicht über meine hochgeladenen Belege </p>
                  </div>
                </div> 
              </div>
          </div>
          <div class="glass">
            <div class="card">
              <div class="icon"> 
                  <div class="fill3"> 
                  </div>
              </div>
              <div class="link">
                <button class="button" @click="navigateTo('/calendar')" type="button"> Mein Kalender </button>
                <div class="text"> 
                  <p> Kalendarische Übersicht </p>
                </div>
              </div> 
            </div>
          </div>
        </div>
        <div class="upper-right">
          <div class="glass">
            <div class="card">
              <div class="icon"> 
                <div class="fill2"> 
                </div>
              </div>
              <div class="link">
                <button class="button" @click="navigateTo('/statistics')" type="button"> Meine Statistiken </button>   
                <div class="text"> 
                  <p> Aufbereitung meiner Belegdaten </p>
                </div>
              </div> 
            </div>
          </div>
          <div class="glass">
            <div class="card">
              <div class="icon"> 
                <div class="fill4"> 
                </div>
              </div>
              <div class="link">
                <button class="button" @click="navigateTo('/user')" type="button"> Meine Benutzerdaten </button>   
                <div class="text"> 
                  <p> Änderung meiner persönlichen Daten </p>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div class="lower">
         <div class="lower-left">
          <div class="glass">
            <div class="card">
              <div class="icon"> 
                <div class="fill2"> 
                </div>
              </div>
              <div class="link">
                <button class="button" @click="navigateTo('/statistics')" type="button"> Meine Statistiken </button>   
                <div class="text"> 
                  <p> Aufbereitung meiner Belegdaten </p>
                </div>
              </div> 
            </div>
          </div>
          <div class="glass">
            <div class="card">
              <div class="icon"> 
                <div class="fill4"> 
                </div>
              </div>
              <div class="link">
                <button class="button" @click="navigateTo('/user')" type="button"> Meine Benutzerdaten </button>   
                <div class="text"> 
                  <p> Änderung meiner persönlichen Daten </p>
                </div>
              </div> 
            </div>
          </div>
        </div>
        <div class="lower-right">
           <div class="glass">
              <div class="card">
                <div class="icon"> 
                  <div class="fill1"> 
                  </div>
                </div>
                <div class="link">
                  <button class="button" @click="navigateTo('/receipts')" type="button"> Meine Belege </button>
                  <div class="text"> 
                    <p> Übersicht über meine hochgeladenen Belege </p>
                  </div>
                </div> 
              </div>
          </div>
          <div class="glass">
            <div class="card">
              <div class="icon"> 
                  <div class="fill3"> 
                  </div>
              </div>
              <div class="link">
                <button class="button" @click="navigateTo('/calendar')" type="button"> Mein Kalender </button>
                <div class="text"> 
                  <p> Kalendarische Übersicht </p>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
    </div>
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  height: auto;
  width: 100%;
  border-radius: 20px;
}

.upper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upper-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upper-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lower {
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
}

.lower-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lower-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass {
  height: 250px;
  width: 170px;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #1b4332;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  margin-top: 100px;
}

.card {
  color: #1b4332;
  padding: none;
  border-radius: 2rem;
  height: 100%;
  width: 200px;
}

.icon { 
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 4;
  height: auto;
  width: 100%;
  border-radius: 2rem 2rem 0rem 0rem; 
}

.fill1, .fill2, .fill3, .fill4 {
    height: 100px;
    width: 100%;
    border-radius: 2rem 2rem 0rem 0rem;
}

.fill1 {
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.fill2 {
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.fill3 {
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.fill4 {
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  padding: 30px 0px;
}

.text {
    flex: 2;
    padding: 15px 0px;
    position: absolute;
    top: 70%;
    right: 5%;
    left: 5%;
}

.fit {
  flex: 1;
  object-fit: scale-down;
  height: 50px;
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

button a {
    color: #081c15;
    text-decoration: none;
}

.button {
  background: none;
  border: 3px solid transparent;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  margin: 4px 2px;
  cursor: pointer;
}

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

@media screen and (max-width: 700px) {
  .glass {
    height: 200px;
    width: 120px;
    border-radius: 2rem;
    margin: 2.5px;
    margin-top: 50px;
  }

  .card {
    height: 100%;
    width: 100%;
  }

  .icon { 
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 4;
    height: auto;
    width: 100%;
    border-radius: 2rem 2rem 0rem 0rem; 
  }

  .fill1, .fill2, .fill3, .fill4 {
    height: 70px;
    width: 100%;
  }

  .link {
    flex: 6;
    padding: 5px 0px;
  }

  .text {
    display: none;
  }

  .upper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upper-left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upper-right {
    display: none;
  }

  .lower {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lower-left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lower-right {
    display: none;
  }

  .icon { 
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 4;
    height: auto;
    width: 100%;
    border-radius: 2rem 2rem 0rem 0rem; 
  }

  .circle1 {
    width: 10rem;
    height: 10rem;
    bottom: 1%;
    left: 55%;
    z-index: 2;
  }

  .circle2 {
    width: 16rem;
    height: 16rem;
    top: 38%;
    left: 25%;
    z-index: 2;
  }

  .circle3 {
    width: 11rem;
    height: 11rem;
    top: 10%;
    left: 55%;
    z-index: 2;
  }
}

</style>