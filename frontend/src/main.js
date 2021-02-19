import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from './store/store';

sync(store, router);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

app.config.devtools = true;