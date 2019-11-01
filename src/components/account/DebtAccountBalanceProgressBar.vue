<template>
    <v-col cols="12">
        <AccountBalanceProgressBar :item="accountBalance"/>
        <OperationsList :operations="operations"/>
    </v-col>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import AccountBalanceProgressBar from '@/components/account/AccountBalanceProgressBar.vue';
    import OperationsList from '@/components/operation/OperationsList.vue';
    import OperationService from '@/services/OperationService';

    @Component({components: {AccountBalanceProgressBar, OperationsList}})
    export default class DebtAccountBalanceProgressBar extends Vue {
        @Prop()
        public accountBalance: any;

        public operations: any = [];


        @Watch("accountBalance",{deep:true,immediate: true})
        accountBalanceChanged(value: any, oldValue: any) {
            console.log("item changed: " + JSON.stringify(value));
            OperationService.search({accountIds: [{value: value.accountId}]})
                .then((data: any) => {
                        this.operations = data.content;
                    },
                );
        }

    }
</script>
<style>

</style>
