import Vuex from 'vuex';

export default new Vuex.Store({
    strict: true, // store kann nur durch eine action oder mutation verändert werden
    state: {
        name: 'Vue',
        user: null,
        token: null,
        isUserLoggedIn: false
    },
    mutations: { // Definition der Operationen
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            if (token) {
                state.isUserLoggedIn = true;
            } else {
                state.isUserLoggedIn = false;
            }
        }
    },
    actions: { // actions: "Ort" für asynchrone Operationen
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        setToken({ commit }, token) {
            commit('setToken', token)
        }
    }
})