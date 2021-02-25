<template>
  <div class="dashboard">
    <Sidebar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Sidebar
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

.dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #1b4332;
  color: white;
  height: 100%;
  width: auto;
}

.content {
  border-radius: 20px;
  margin: 0px 0px 0px 0px;
  background: linear-gradient(to right top, #40916c, #74c69d);
  width: auto;
  height: 100%;
}

.circle1, .circle2 {
  background: white;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
  width: 20rem;
  height: 20rem;
  position: absolute;
  border-radius: 50%;
}

.circle1 {
  bottom: 2%;
  left: 12%;
  z-index: 2;
}

.circle2 {
  top: 10%;
  right: 12%;
  z-index: 2;
}

.button {
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

.error {
  border-color: red;
  color: red;
  z-index: 3;
}

@media screen and (max-width: 700px) {
  div.content {
    margin-left: 0;
  }
}

</style>
