import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        testVar: '12345',
        accountsView: {
            accounts: [
                {
                    id: 10,
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
                    id: 20,
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
                    id: 30,
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
    mutations: {
        updateAccounts: (state, newAccountsList) => {
            state.accountsView.accounts = newAccountsList;
        }
    },
    actions: {
        loadAccounts(context) {
            axios
                .get('http://localhost:8092/api/accounts?size=100')
                .then((response) => (console.log(response), context.commit("updateAccounts",response.data.content)));
        }
    },
});
