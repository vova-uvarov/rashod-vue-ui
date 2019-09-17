import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment from 'moment';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = 'http://localhost:8092';
axios.interceptors.request.use(function (config) {
    let params = config.params;
    if (params && config.method==='get') {
        Object.keys(params)
            .forEach(key => {
                if (Array.isArray(params[key])) {
                    params[key] = params[key].join(',');
                }
            });
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

Vue.config.productionTip = false;

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
    render: (h) => h(App),
}).$mount('#app');
