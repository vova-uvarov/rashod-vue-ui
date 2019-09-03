<template>
    <v-toolbar dense>
        <v-chip
                v-for="item in balances" :key="item.accountId"
                class="ma-2"
                color="primary"
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
            axios
                .get('http://localhost:8092/api/accounts/balances')
                .then((response) => (this.balances = response.data));
        }

        data() {
            return {
                balances: []
            };
        }
    }
</script>
