<template>
    <v-container>
        <h1>Еще должны</h1>
        <v-row v-for="item in activeDebts">
                <DebtAccountBalanceProgressBar :accountBalance="item"/>
        </v-row>

        <h1>Уже отдали</h1>
        <v-row v-for="item in inactiveDebts">
                <DebtAccountBalanceProgressBar :accountBalance="item"/>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AccountService from '@/services/AccountService';
import OperationService from '@/services/OperationService';
import DebtAccountBalanceProgressBar from '@/components/account/DebtAccountBalanceProgressBar.vue';
import OperationsList from '@/components/operation/OperationsList.vue';

@Component({components: {DebtAccountBalanceProgressBar,OperationsList}})
export default class GoalAccountList extends Vue {

    public activeDebts = [];
    public inactiveDebts = [];

    public mounted() {
        AccountService.loadDebtBalances("ACTIVE")
            .then((data: any) => {
                this.activeDebts = data;
            });

        AccountService.loadDebtBalances("INACTIVE")
            .then((data: any) => {
                this.inactiveDebts = data;
            });
    }
}
</script>
