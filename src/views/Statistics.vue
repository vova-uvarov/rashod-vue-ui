<template>
    <v-container fluid class="pa-2">
        <v-row>
            <v-col cols="4">
                <v-card>
                    <AccountBalancesPie/>
                </v-card>
            </v-col>

        </v-row>
        <v-row>

            <v-col cols="12">
                <IncomAndConsumptionByMonth/>
            </v-col>
        </v-row>

    </v-container>

</template>
<script lang="ts">
    import IncomAndConsumptionByMonth from "../components/charts/IncomAndConsumptionByMonth.vue";
    import AccountBalancesPie from "../components/charts/AccountBalancesPie.vue";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            IncomAndConsumptionByMonth, AccountBalancesPie
        }
    })
    export default class StatisticsVue extends Vue {


    }
</script>

