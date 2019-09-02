import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import moment from 'moment';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

Vue.filter('dateFormatter', function(value: any) {
    if (!value) {
        return '';
    }
    return moment(value).format('YYYY-MM-DD');
});

Vue.filter('truncateString', function(value: any) {
    if (value.length > 30) {
        return value.substring(0, 30) + '...';
    } else {
        return value;
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
