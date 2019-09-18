<template>
    <v-toolbar dense>
        <v-chip
                color="secondary"
                outlined
        >
            <b>Баланс: </b> {{totalBalance | moneyFormat}}
        </v-chip>

        <v-chip
                v-for="item in balances" :key="item.accountId"
                class="ma-2"
                color="primary"
                :small="false"
                outlined
        >
            <b @click.stop="equalizationAccount(item)">{{item.accountName}}:</b> {{item.balance|moneyFormat}}
        </v-chip>

        <v-chip
                v-for="item in balancesGoalByCurrency" :key="item.accountName"
                color="accent"
                outlined
        >
            <b>{{item.accountName}}:</b> {{item.balance|moneyFormat}}
        </v-chip>
        <EqualizationAccountBalanceDialog :accountBalance="accountBalance"
                                          :visible="showEualizationDialog"
                                          @close="showEualizationDialog=false"/>
    </v-toolbar>
</template>

<script lang="ts">
    import AccountService from '@/services/AccountService';
    import EqualizationAccountBalanceDialog from '@/components/account/EqualizationAccountBalanceDialog.vue';
    import {Component, Vue} from 'vue-property-decorator';

    @Component({components: {EqualizationAccountBalanceDialog},})
    export default class BalanceListBar extends Vue {

        public totalBalance = 0;
        public balances = [];
        public balancesGoalByCurrency = [];
        public showEualizationDialog = false;
        public accountBalance = {};

        public mounted() {
            this.loadBalances();

            this.$root.$on('operationChanged', () => {
                this.loadBalances();
            });
        }

        public equalizationAccount(selectedAccountBalance: any) {
            this.accountBalance = selectedAccountBalance;
            this.showEualizationDialog = true;
        }

        private loadBalances() {
            AccountService.loadBalances()
                .then((balances: any) => {
                    this.balances = balances;
                });

            AccountService.totalBalance()
                .then((balance: any) => {
                    this.totalBalance = balance;
                });

            AccountService.balancesByCurrency()
                .then((balances: any) => {
                    this.balancesGoalByCurrency = balances;
                });
        }
    }
</script>
