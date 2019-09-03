import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        operations: [],
        categories: [],
        accounts: [],
    },
    mutations: {
        updateOperations: (state, newValue) => {
            state.operations = newValue;
        },
        updateCategories: (state, newValue) => {
            state.categories = newValue;
        },
        updateAccounts: (state, newAccountsList) => {
            state.accounts = newAccountsList;
        }
    },
    actions: {
        loadOperations(context) {
            axios
                .get('http://localhost:8092/api/operations?size=100')
                .then((response) => ( context.commit('updateOperations', response.data.content)));
        },
        loadCategories(context) {
            axios
                .get('http://localhost:8092/api/categories?size=10000')
                .then((response) => ( context.commit('updateCategories', response.data.content)));
        },
        loadAccounts(context) {
            axios
                .get('http://localhost:8092/api/accounts?size=100')
                .then((response) => ( context.commit('updateAccounts', response.data.content)));
        },
    },
});
