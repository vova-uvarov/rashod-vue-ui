import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment from 'moment';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
const  accessToken  =  localStorage.getItem('user-token');

if (accessToken) {
    axios.defaults.headers.common['Authorization'] =  'Bearer ' + accessToken;
}

axios.interceptors.request.use((config: any) => {
    const params = config.params;
    if (params && config.method === 'get') {
        Object.keys(params)
            .forEach((key) => {
                if (Array.isArray(params[key])) {
                    params[key] = params[key].join(',');
                }
            });
    }
    return config;
}, (error: any) => (Promise.reject(error)));

axios.interceptors.response.use(undefined, function(err) {
    return new Promise(function(resolve, reject) {
        if (err.response.status === 401) {
            store.dispatch('logout');
        }
        throw err;
    });
});

Vue.config.productionTip = false;

Vue.filter('dictionaryValue', (value: string, dictionaryName: string) => {
    const staticDictionaries: any = store.state.staticDictionaries;
    return staticDictionaries[dictionaryName]
        .filter((el: any) => (el.key === value))
        .map((el: any) => (el.value))[0];
});

Vue.filter('dateFormatter', (value: any) => {
    if (!value) {
        return '';
    }
    return moment(value).format('YYYY-MM-DD');
});

Vue.filter('truncateString', (value: any) => {
    if (value.length > 30) {
        return value.substring(0, 30) + '...';
    } else {
        return value;
    }
});

Vue.filter('moneyFormat', (value: any) => {
    const val = (value / 1).toFixed(2).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
});

new Vue({
    router,
    store,
    vuetify,
    render: (h: any) => h(App)
}).$mount('#app');
