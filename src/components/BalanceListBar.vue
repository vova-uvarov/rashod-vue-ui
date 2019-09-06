<template>
    <v-toolbar dense>
        <v-chip
                class="ma-2"
                color="secondary"
                outlined
        >
            <b>Баланс: </b> {{totalBalance | moneyFormat}}
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
    import AccountService, {Balance} from "@/services/AccountService";
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class BalanceListBar extends Vue {
        created() {
            this.loadBalances();
        }

        private loadBalances() {
            AccountService.loadBalances()
                .then((balances) => {
                    this.balances = balances;
                });

            AccountService.totalBalance()
                .then((balance) => {
                    this.totalBalance = balance;
                });

            AccountService.balancesByCurrency()
                .then((balances) => {
                    this.balancesGoalByCurrency = balances;
                });
        }

        data() {

            let newVar: { totalBalance: number, balances: Balance[], balancesGoalByCurrency: any[] } = {
                totalBalance: 0,
                balances: [],
                balancesGoalByCurrency: [],
            };
            return newVar;
        }

        mounted() {
            this.$root.$on("operationCreated", () => {
                this.loadBalances();
            });

            this.$root.$on("operationDeleted", () => {
                this.loadBalances();
            });
        }
    }
</script>
