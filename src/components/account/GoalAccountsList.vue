<template>
    <v-container>
        <v-row v-for="item in balances">
            <v-col cols="11">
                <AccountBalanceProgressBar :item="item"/>
            </v-col>
            <v-col cols="1">
                <v-btn class="mx-2" fab dark x-small color="primary" @click="editAccount(item.accountId)">
                    <v-icon dark>mdi-file-document-edit</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <EditAccountDialog :accountId="accountId" :visible="showEditDialog" @close="closeDialog"/>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AccountService from '@/services/AccountService';
import AccountBalanceProgressBar from '@/components/account/AccountBalanceProgressBar.vue';
import EditAccountDialog from '@/components/account/EditAccountDialog.vue';

@Component({components: {AccountBalanceProgressBar, EditAccountDialog}})
export default class GoalAccountList extends Vue {

    public balances = [];
    public showEditDialog = false;
    public accountId = null;

    public editAccount(accountID: any) {
        this.accountId = accountID;
        this.showEditDialog = true;
    }

    public closeDialog() {
        this.reloadBalances();
        this.showEditDialog = false;
    }
    public mounted() {
        this.reloadBalances();
    }

    private reloadBalances() {
        AccountService.loadGoalBalances()
            .then((data: any) => {
                this.balances = data;
            });
    }
}
</script>
