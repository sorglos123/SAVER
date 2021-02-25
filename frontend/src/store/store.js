import Vuex from 'vuex';

export default new Vuex.Store({
    strict: true, // Store kann nur durch eine action oder mutation verändert werden
    state: {
        name: 'Vue',
        userID: null,
        token: null,
        isUserLoggedIn: false
    },
    mutations: { // Definition der Operationen
        setUserID(state, user) {
            state.userID = user.user_id;
        },
        setToken(state, token) {
            state.token = token;
            if (token) {
                state.isUserLoggedIn = true;
            } else {
                state.isUserLoggedIn = false;
            }
        },
        nullLogin(state) {
            state.isUserLoggedIn = false;
            state.userID = null;
            state.token = null;
        }
    },
    actions: { // actions: "Ort" für asynchrone Operationen
        setUserID({ commit }, user) {
            commit('setUserID', user)
        },
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        nullLogin({ commit }) {
            commit('nullLogin')
        }
    }
})