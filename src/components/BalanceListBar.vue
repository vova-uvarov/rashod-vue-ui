<template>
    <v-toolbar dense>
        <v-chip
                class="ma-2"
                color="secondary"
                outlined
        >
            <b>Баланс: </b> {{totalBalance|moneyFormat}}
        </v-chip>

        <v-chip
                v-for="item in balances" :key="item.accountId"
                class="ma-2"
                color="primary"
                outlined
        >
            <b>{{item.accountName}}:</b> {{item.balance|moneyFormat}}
        </v-chip>

        <v-chip
                v-for="item in balancesGoalByCurrency" :key="item.accountName"
                class="ma-2"
                color="accent"
                outlined
        >
            <b>{{item.accountName}}:</b> {{item.balance|moneyFormat}}
        </v-chip>
    </v-toolbar>
</template>

<script lang="ts">
    import axios from 'axios';
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BalanceListBar extends Vue {
        created() {
            this.loadBalances();
        }

        private loadBalances() {
            axios
                .get("http://localhost:8092/api/accounts/balances")
                .then((response) => (this.balances = response.data));

            axios
                .get("http://localhost:8092/api/accounts/totalBalance")
                .then((response) => (this.totalBalance = response.data));

            axios
                .get("http://localhost:8092/api/accounts/balances/goal/byCurrency")
                .then((response) => (this.balancesGoalByCurrency = response.data));
        }

        data() {
            return {
                totalBalance: 0,
                balances: [],
                balancesGoalByCurrency: [],
            };
        }

        mounted(){
            this.$root.$on('operationCreated', () => {
                this.loadBalances();
            })

            this.$root.$on('operationDeleted', () => {
                this.loadBalances();
            })
        }
    }
</script>
