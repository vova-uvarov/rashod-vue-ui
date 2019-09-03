import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        operationsView: {
            operations: [],
            totalPages: 0,
            currentPage: 1
        },

        categories: [],
        accounts: [],
    },
    mutations: {

        setOperationViewCurrentPage: (state, newValue) => {
            state.operationsView.currentPage = newValue;
        },
        updateOperations: (state, newValue) => {
            state.operationsView.operations = newValue.content;
            state.operationsView.totalPages = newValue.totalPages;
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
                .get('http://localhost:8092/api/operations/search?isPlan=false&size=10&page=' + (this.state.operationsView.currentPage - 1))
                .then((response) => (context.commit('updateOperations', response.data)));
        },

        loadCategories(context) {
            axios
                .get('http://localhost:8092/api/categories?size=10000')
                .then((response) => (context.commit('updateCategories', response.data.content)));
        },
        loadAccounts(context) {
            axios
                .get('http://localhost:8092/api/accounts?size=100')
                .then((response) => (context.commit('updateAccounts', response.data.content)));
        },
    },
});
