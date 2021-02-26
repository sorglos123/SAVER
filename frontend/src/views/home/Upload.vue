<template>
    <div class="main">
      <section class="glass">
        <div class="form">
          <form enctype="multipart/form-data">
          <input 
            style="display: none" 
            type="file" 
            @change="preview" 
            id="receipt" 
            name="receipt" 
            accept="image/png, image/jpeg, .pdf"
            ref="fileInput">
            <label for="choose_button"> Bitte wählen Sie eine Datei zum Hochladen aus: </label> <br>
            <button class="button" name="choose_button" type="button" @click="$refs.fileInput.click()"> Datei auswählen </button> <br>
            <label for="upload_button"> Danach können Sie den Beleg hochladen: </label> <br>
            <button class="button" name="upload_button" @click="uploadReceipt()"> Beleg hochladen </button> <br>
            <br> <div class="error" v-html="error" id="error"></div> <br>
            <label for="receipt_date"> Belegdatum: </label> <br>
            <input type="text" v-model="date" name="receipt_date" id="receipt_date" placeholder="Belegdatum"><br><br>
            <label for="receipt_store">Verkaufsstelle: </label> <br>
            <select v-model="store" name="receipt_store" id="receipt_store" placeholder="Verkaufsstelle">
              <option value="Aldi">Aldi</option>
              <option value="Kaufland">Kaufland</option>
              <option value="Lidl">Lidl</option>
              <option value="Rewe">Rewe</option>
            </select> <br><br>
            <label for="receipt_value"> Belegsumme: </label> <br>
            <input type="text" v-model="value" name="receipt_value" id="receipt_value" placeholder="Belegsumme"> <br> <br>
          </form>
        </div>
        <div class="full-preview" id="preview">
          <img class="fit" v-if="url" :src="url" />
        </div>
      </section>
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
    </div>
</template>

<script>
import UploadService from '@/services/UploadService'
export default {
  data () {
    return {
      url: null,
      date: '',
      store: '',
      value: 0,
      selectedFile: null,
      error: null
    }
  },
  methods: {
    preview(event) {
      this.selectedFile = event.target.files[0];
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    async uploadReceipt() {
      try {
        var formdata = new FormData();
        formdata.append('receipt', this.selectedFile);
        formdata.append('total', this.value);
        formdata.append('supermarket', this.store);
        formdata.append('date', this.date);
        formdata.append('uid', this.$store.state.userID);  

        const response = await UploadService.uploadReceiptData(formdata);

        if(response) {
          document.getElementById('error').style.color = 'green';
          this.error = response.data.message;
          alert(response.data.message);
        }
      } catch(error) {
        this.error = error.response.data.error;
      }
    }
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
  min-height: 85vh;
  height: auto;
  background: linear-gradient(to right top, #40916c, #74c69d);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
}

.glass {
  min-height: 65vh;
  width: 80%;
  background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border-radius: 2rem;
  z-index: 3;
  backdrop-filter: blur(2rem);
  color: #1b4332;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.full-preview {
  flex: 2;
  height: 60vh;
  width: auto;
  margin: 5px;
}

.form {
  flex: 1;
  height: auto;
  width: 100%;
  margin: 5px;
}

.fit {
  object-fit: fill; /* image is resized to fill the given dimension. If necessary, the image will be stretched or squished to fit */
  /* object-fit: contain; /* image keeps its aspect ratio, but is resized to fit within the given dimension */
  /* object-fit: cover; /*   image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit */ 
  /* object-fit: scale-down; /* the image is scaled down to the smallest version of none or contain */
  height: 100%;
  width: auto;
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

.button {
  background: linear-gradient(to right top, #40916c, #74c69d);
  background: linear-gradient(to bottom, #bbd2c5, #536976, #292e49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight: bolder;
  margin: 4px 2px;
  cursor: pointer;
}

button a {
    color: white;
    text-decoration: none;
}

.error {
  color: red;
  z-index: 3;
}

@media screen and (max-width: 700px) {  
  .glass {
    flex-direction: column;
  }

  .form {
    width: 90%;
    height: auto;
    margin-top: 10px;
  }

  .button {
    padding: 7.5px 16px;
    font-size: 12px;
  }

  .fit {
    object-fit: fill; /* image is resized to fill the given dimension. If necessary, the image will be stretched or squished to fit */
    /* object-fit: contain; /* image keeps its aspect ratio, but is resized to fit within the given dimension */
    /* object-fit: cover; /*   image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit */ 
    /* object-fit: scale-down; /* the image is scaled down to the smallest version of none or contain */
    height: 80%;
    width: auto;
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