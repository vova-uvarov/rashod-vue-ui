import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mainView: {
            lastConsumptionOperations: [],
            lastTransferAndIncomeOperations: [],
        },
        accountsView: {
            accounts: [],
        },
    },
    mutations: {
        updateAccounts: (state, newAccountsList) => {
            state.accountsView.accounts = newAccountsList;
        },
        updateLastConsumptionOperations: (state, newOperations) => {
            state.mainView.lastConsumptionOperations = newOperations;
        },
        updateLastTransferAndIncomeOperations: (state, newOperations) => {
            state.mainView.lastTransferAndIncomeOperations = newOperations;
        },
    },
    actions: {
        loadAccounts(context) {
            axios
                .get('http://localhost:8092/api/accounts?size=100')
                .then((response) => (console.log(response), context.commit('updateAccounts', response.data.content)));
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
