import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

    strict: true,
    state: {
        operationsView: {
            operations: [],
            totalPages: 0,
            currentPage: 1,
            filter: {
                dateFrom: '',
                dateTo: new Date().toISOString().substr(0, 10),
                category: {},
                account: {},
                place: '',
                tag: '',
                costFrom: null,
                costTo: null,
                size: 10,
                page: 1,
            },
        },

        categories: [],
        accounts: [],
    },
    mutations: {
        initState: (state) => {
            const now = new Date();
            now.setDate(now.getDate() - 30);
            state.operationsView.filter.dateFrom = now.toISOString().substr(0, 10);
        },
        updateOperationsFilter: (state, newValue) => {
            state.operationsView.filter = newValue;
        },

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
        },
    },
    actions: {
        reloadOperations(context) {
            const filter = JSON.parse(JSON.stringify(this.state.operationsView.filter));
            filter.page = this.state.operationsView.currentPage - 1;
            if (filter.dateFrom) {
                filter.dateFrom = filter.dateFrom + "T00:00"; // todo дикий хак
            }

            if (filter.dateTo) {
                filter.dateTo = filter.dateTo + "T00:00"; // todo дикий хак
            }
            axios
                .get('http://localhost:8092/api/operations/search', {
                    params: filter,
                })
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
