<template>
    <v-card>
        <v-card-text class="custom-card-text">
            <v-chip
                    color="secondary"
                    outlined
            >
                <b>Баланс: </b> <span :class="balanceClass(totalBalance)"> {{totalBalance | moneyFormat}}</span>
            </v-chip>

            <v-chip
                    v-for="item in balances" :key="item.accountId"
                    class="ma-2"
                    color="primary"
                    :small="false"
                    outlined
            >
                <b class="equalizationAccountCursor" @click.stop="equalizationAccount(item)">{{item.accountName}}:</b> <span
                    :class="balanceClass(item.balance)">{{item.balance|moneyFormat}}</span>

            </v-chip>

            <v-chip
                    v-for="item in balancesGoalByCurrency" :key="item.accountName"
                    color="accent"
                    outlined
            >
                <b>{{item.accountName}}:</b> {{item.balance|moneyFormat}}
            </v-chip>
        </v-card-text>
        <EqualizationAccountBalanceDialog :accountBalance="accountBalance"
                                          :visible="showEualizationDialog"
                                          @close="showEualizationDialog=false"/>
    </v-card>
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

        public balanceClass(balance:number){
            if (balance<0){
                return 'negativeBalance'
            }
            return ''
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
<style>
    .equalizationAccountCursor {
        cursor: pointer;
    }
    .custom-card-text {
        padding-bottom: 0;
        padding-top: 0;
    }
    .negativeBalance{
        color: red;
    }
</style>
