<template>
    <v-container>
        <v-row v-for="item in balances">
            <v-col cols="12">
                <v-progress-linear
                        :value="item.balance*100/item.goalCost"
                        color="blue-grey"
                        height="25"
                >
                    <template v-slot="{ value }">
                        <strong>{{item.accountName}}: {{item.balance|moneyFormat}} из
                            {{item.goalCost|moneyFormat}}</strong>
                    </template>
                </v-progress-linear>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import AccountService from "@/services/AccountService";

    @Component
    export default class AccountList extends Vue {
        mounted() {
            AccountService.loadGoalBalances()
                .then((data:any) => {
                    this.balances = data;
                });
        }

        balances = [];
    }
</script>
