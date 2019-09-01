import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        testVar: '12345',
        accountsView: {
            accounts: [
                {
                    id: 1,
                    insTime: '2019-08-31T20:51:35.836',
                    modifTime: '2019-08-31T20:51:37.721',
                    name: 'Наличные',
                    description: 'Наши наличные',
                    accountType: 'SIMPLE',
                    targetCost: null,
                    color: 'BLACK',
                    round: false,
                    status: 'ACTIVE',
                    currency: 'RUBLES',
                    balance: true,
                },
                {
                    id: 2,
                    insTime: '2019-08-31T20:51:35.836',
                    modifTime: '2019-08-31T20:51:37.721',
                    name: 'Наличные',
                    description: 'Наши наличные',
                    accountType: 'SIMPLE',
                    targetCost: null,
                    color: 'BLACK',
                    round: false,
                    status: 'ACTIVE',
                    currency: 'RUBLES',
                    balance: true,
                },
                {
                    id: 3,
                    insTime: '2019-08-31T20:51:35.836',
                    modifTime: '2019-08-31T20:51:37.721',
                    name: 'Наличные',
                    description: 'Наши наличные',
                    accountType: 'SIMPLE',
                    targetCost: null,
                    color: 'BLACK',
                    round: false,
                    status: 'ACTIVE',
                    currency: 'RUBLES',
                    balance: true,
                },
            ],
        },
    },
    mutations: {},
    actions: {},
});
