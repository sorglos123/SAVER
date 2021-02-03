// import Vue from 'vue';
// import Vuex from 'vuex';
import {createStore} from 'vuex';

const store = createStore({
    strict: true,
    state: {
        name: 'Vue',
        user: null,
        token: null
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setToken (state, token) {
            state.token = token;
        }
    },
    actions: {
        setUser ({commit}, user) {
            commit('setUser', user)
        },
        setToken ({commit}, token) {
            commit('setToken', token)
        }
    }
});

export default store;

// Vue.use(Vuex);