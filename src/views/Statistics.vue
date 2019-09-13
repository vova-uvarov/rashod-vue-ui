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
                <IncomAndConsumptionTrend/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <ConsumptionsByDate/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <AverageByDayTrend/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6">
                <TotalConsumptionsPie title="Расходы за все время" operation-type="CONSUMPTION"/>
            </v-col>
            <v-col cols="6">
                <TotalConsumptionsPie title="Доходы за все время" operation-type="INCOME"/>
            </v-col>
        </v-row>


    </v-container>

</template>
<script lang="ts">
    import IncomAndConsumptionTrend from "../components/charts/IncomAndConsumptionTrend.vue";
    import ConsumptionsByDate from "../components/charts/ConsumptionsByDate.vue";
    import TotalConsumptionsPie from "../components/charts/TotalConsumptionsPie.vue";
    import AccountBalancesPie from "../components/charts/AccountBalancesPie.vue";
    import AverageByDayTrend from "../components/charts/AverageByDayTrend.vue";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            IncomAndConsumptionTrend, AccountBalancesPie, ConsumptionsByDate,
            AverageByDayTrend, TotalConsumptionsPie
        }
    })
    export default class StatisticsVue extends Vue {


    }
</script>

