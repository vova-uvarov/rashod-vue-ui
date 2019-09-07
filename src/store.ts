import Vue from 'vue';
import Vuex from 'vuex';
import AccountService from '@/services/AccountService';
import OperationService from '@/services/OperationService';
import DictionaryService from '@/services/DictionaryService';
import CategoryService from '@/services/CategoryService';
import ShoppingItemService from '@/services/ShoppingItemService';

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
                operationTypes: [],
                accountId: null,
                place: '',
                tag: '',
                costFrom: null,
                costTo: null,
                size: 10,
                page: 1,
            },
        },

        shoppingItemNames: [],
        categories: [],
        accounts: [],
        operationTypes: [],
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

        updateOperationTypes: (state, newValue) => {
            state.operationTypes = newValue;
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
        updateShoppingItemsNames: (state, newValue: object[]) => {
            state.shoppingItemNames = newValue;
        },
    },
    actions: {
        reloadOperations(context) {
            const filter = JSON.parse(JSON.stringify(this.state.operationsView.filter));
            filter.page = this.state.operationsView.currentPage - 1;
            OperationService.search(filter)
                .then((data) => (context.commit('updateOperations', data)));

        },
        loadDictionaries(context) {
            DictionaryService.getOperationTypes()
                .then((data) => (context.commit('updateOperationTypes', data)));
        },

        loadCategories(context) {
            CategoryService.getAllCategories()
                .then((categories) => (context.commit('updateCategories', categories)));
        },
        loadAccounts(context) {
            AccountService.getAllAccounts()
                .then((accounts) => (context.commit('updateAccounts', accounts)));
        },
        loadShoppingItems(context) {
            ShoppingItemService.getAllNames()
                .then((names) => {
                    context.commit('updateShoppingItemsNames', names);
                });
        },
    },
});
