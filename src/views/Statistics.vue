<template>
    <v-container fluid class="pa-2">
        <v-row>
            <v-col cols="4">
                <v-card>
                    <AccountBalancesPie/>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-card>
                    <IncomAndConsumptionByMonth :raw-data="incomeConsumptionByLastYear" title="Доход/Расход по месяцам в текущем году"/>
                </v-card>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <IncomAndConsumptionByMonth :raw-data="incomeConsumptionPrevious" title="Доход/Расход по месяцам в прошлом"/>
                </v-card>
            </v-col>
        </v-row>

    </v-container>

</template>
<script lang="ts">
    import IncomAndConsumptionByMonth from "../components/charts/IncomAndConsumptionByMonth.vue";
    import AccountBalancesPie from "../components/charts/AccountBalancesPie.vue";
    import {Component, Vue} from "vue-property-decorator";
    import StatisticsService from '@/services/StatisticsService';

    @Component({
        components: {
            IncomAndConsumptionByMonth, AccountBalancesPie
        }
    })
    export default class StatisticsVue extends Vue {
        mounted() {
            StatisticsService.incomeConsumptionByMonthLastYear()
                .then((responseData) => {
                    this.incomeConsumptionByLastYear = responseData;
                });

            StatisticsService.incomeConsumptionByMonthLastPrevious()
                .then((responseData) => {
                    this.incomeConsumptionPrevious = responseData;
                });
        }

        data() {
            return {
                incomeConsumptionByLastYear: {},
                incomeConsumptionPrevious: {},
            };
        }

    }
</script>

