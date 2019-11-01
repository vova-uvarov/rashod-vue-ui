<template>
    <v-container>
        <v-row v-for="item in balances">
            <v-col cols="12">
                <AccountBalanceProgressBar :item="item"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AccountService from '@/services/AccountService';
import AccountBalanceProgressBar from '@/components/account/AccountBalanceProgressBar.vue';

@Component({components: {AccountBalanceProgressBar}})
export default class GoalAccountList extends Vue {

    public balances = [];
    public mounted() {
        AccountService.loadGoalBalances()
            .then((data: any) => {
                this.balances = data;
            });
    }
}
</script>
