import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        operations: [],
        categories: [],
        accounts: [],
        mainView: {
            lastConsumptionOperations: [],
            lastTransferAndIncomeOperations: [],
        },
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
        },
        updateLastConsumptionOperations: (state, newOperations) => {
            state.mainView.lastConsumptionOperations = newOperations;
        },
        updateLastTransferAndIncomeOperations: (state, newOperations) => {
            state.mainView.lastTransferAndIncomeOperations = newOperations;
        },
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

        loadLastConsumptionOperations(context) {
            axios
                .get('http://localhost:8092/api/operations/search', {
                    params: {
                        operationTypes:  'CONSUMPTION',
                    },
                })
                .then((response) => (console.log(response), context.commit('updateLastConsumptionOperations', response.data.content)));
        },

        loadLastTransferAndIncomingOperations(context) {
            axios
                .get('http://localhost:8092/api/operations/search', {
                    params: {
                        operationTypes:  'INCOME,TRANSFER',
                    },
                })
                .then((response) => (console.log(response), context.commit('updateLastTransferAndIncomeOperations', response.data.content)));
        },
    },
});
