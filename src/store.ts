import Vue from 'vue';
import Vuex from 'vuex';
import AppParamService from '@/services/AppParamService';
import PlaceService from '@/services/PlaceService';
import AccountService from '@/services/AccountService';
import OperationService from '@/services/OperationService';
import DictionaryService from '@/services/DictionaryService';
import CategoryService from '@/services/CategoryService';
import ShoppingItemService from '@/services/ShoppingItemService';

Vue.use(Vuex);

export default new Vuex.Store({

    strict: true,
    state: {
        operationPlans: {
            operations: [],
        },
        operationsView: {
            operations: [],
            totalPages: 0,
            currentPage: 1,
            filter: {
                dateFrom: '',
                dateTo: new Date().toISOString().substr(0, 10),
                categoryIds: [],
                operationTypes: [],
                accountIds: [],
                place: '',
                tag: '',
                costFrom: null,
                costTo: null,
                size: 10,
                page: 1,
                isPlan: false,
            },
        },

        shoppingItemNames: [],
        categories: [],
        accounts: [],
        operationTypes: [],
        places: [],
        appParams: [],
        paramGroups: [],
        paramKeys: [],
        accountTypes: [],
        currencies: [],
        accountStatuses: [],

    },
    mutations: {
        initState: (state) => {
            const now = new Date();
            now.setDate(now.getDate() - 30);
            state.operationsView.filter.dateFrom = now.toISOString().substr(0, 10);
        },

        updatePlanOperations: (state, newValue) => {
            state.operationPlans.operations = newValue;
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
        updatePlaces: (state, newValue) => {
            state.places = newValue;
        },
        updateAppParams: (state, newValue) => {
            state.appParams = newValue;
        },
        updateParamGroups: (state, newValue) => {
            state.paramGroups = newValue;
        },
        updateParamKeys: (state, newValue) => {
            state.paramKeys = newValue;
        },
        updateShoppingItemsNames: (state, newValue: object[]) => {
            state.shoppingItemNames = newValue.map((item) => ({name: item}));
        },
        updateAccountTypes: (state, newValue) => {
            state.accountTypes = newValue;
        },
        updateCurrencies: (state, newValue) => {
            state.currencies = newValue;
        },
        updateAccountStatuses: (state, newValue) => {
            state.accountStatuses = newValue;
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
        loadPlaces(context) {
            PlaceService.getPlaces()
                .then((places) => (context.commit('updatePlaces', places)));
        },
        loadPlans(context) {
            OperationService.search({isPlan: true, size: 100000, sort: 'operationDate'})
                .then((data) => (context.commit('updatePlanOperations', data.content)));
        },
        loadParams(context) {
            AppParamService.getAll()
                .then((data) => (context.commit('updateAppParams', data)));
        },
        loadParamGroups(context) {
            AppParamService.getGroups()
                .then((data) => (context.commit('updateParamGroups', data)));
        },
        loadParamKeys(context) {
            AppParamService.getKeys()
                .then((data) => (context.commit('updateParamKeys', data)));
        },
        loadAccountTypes(context) {
            DictionaryService.getAccountTypes()
                .then((data) => (context.commit('updateAccountTypes', data)));
        },
        loadCurrencies(context) {
            DictionaryService.getCurrencies()
                .then((data) => (context.commit('updateCurrencies', data)));
        },
        loadAccountStatuses(context) {
            DictionaryService.getAccountStatuses()
                .then((data) => (context.commit('updateAccountStatuses', data)));
        },
    },
});
