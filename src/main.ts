import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import moment from 'moment';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

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
