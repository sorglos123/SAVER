import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
// import {sync} from 'vuex-router-sync';
import store from './store/store';

// sync(store, router);

createApp(App).
use(router).
use(store).
mount('#app');