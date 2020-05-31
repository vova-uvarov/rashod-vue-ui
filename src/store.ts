import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import AppParamService from '@/services/AppParamService';
import PlaceService from '@/services/PlaceService';
import AccountService from '@/services/AccountService';
import OperationService from '@/services/OperationService';
import DictionaryService from '@/services/DictionaryService';
import CategoryService from '@/services/CategoryService';
import LoginService from '@/services/LoginService';
import ShoppingItemService from '@/services/ShoppingItemService';
import axios, {AxiosResponse} from 'axios';

Vue.use(Vuex);

function initialState() {
    return {
        auth: {
            token: localStorage.getItem('user-token') || '',
            status: '',
        },

        staticDictionaries: {},
        dictionaries: {
            years: [],
        },
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

        shoppingItemNames: {},
        categories: [],
        accounts: [],
        places: [],
        appParams: [],
    };
}
export default new Vuex.Store({

    strict: true,
    state: initialState,
    getters: {
        isAuthenticated: (state) => {
            return !!state.auth.token;
        },
        shoppintItemNamesAll: (state) => {
            const shoppingItemNames: any = state.shoppingItemNames;
            let result: any[] = [];
            Object.keys(shoppingItemNames)
                .forEach((key) => {
                    result = result.concat(shoppingItemNames[key].map((item: any) => ({name: item})));
                });
            return result;
        },

        shoppintItemNamesByOperationType: (state) => (operationType: string) => {
            if (operationType) {
                const shoppingItemNames: any = state.shoppingItemNames;
                const operationNames = shoppingItemNames[operationType];
                if (operationNames) {
                    return operationNames.map((item: any) => ({name: item}));
                }
            }
            return [];
        },
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

        updateStaticDictionaries: (state, newValue) => {
            state.staticDictionaries = newValue;
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

        updateShoppingItemsNames: (state, newValue) => {
            state.shoppingItemNames = newValue;
        },

        updateYears: (state, newValue) => {
            state.dictionaries.years = newValue;
        },
        authSuccess: (state, newValue) => {
            state.auth.token = newValue;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newValue;
            localStorage.setItem('user-token', newValue);
            router.push('/');
        },
        logout: (state) => {
            localStorage.removeItem('user-token');
            state.auth.token = '';
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
            DictionaryService.getStaticDictionaries()
                .then((data) => (context.commit('updateStaticDictionaries', data)));
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
                .then((data: any) => (context.commit('updatePlanOperations', data.content)));
        },
        loadParams(context) {
            AppParamService.getAll()
                .then((data) => (context.commit('updateAppParams', data)));
        },

        loadYears(context) {
            DictionaryService.getYears()
                .then((data) => (context.commit('updateYears', data)));
        },
        authRequest(context: any, payload: any) {
            LoginService.login(payload.userName, payload.password)
                .then((data: any) => (context.commit('authSuccess', data.access_token)));
            //    todo обрабатыватьошибки
        },
        logout(context: any) {
            this.replaceState(initialState());
            context.commit('logout');
            delete axios.defaults.headers.common['Authorization'];
            context.commit('resetState');
            router.push('/login');
        },
    },
});
