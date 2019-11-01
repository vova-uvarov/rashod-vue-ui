<template>
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
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class AccountBalanceProgressBar extends Vue {
        @Prop()
        public item: any;

    }
</script>
<style>

</style>
