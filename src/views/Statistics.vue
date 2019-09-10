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

    </v-container>

</template>
<script lang="ts">
    import IncomAndConsumptionTrend from "../components/charts/IncomAndConsumptionTrend.vue";
    import AccountBalancesPie from "../components/charts/AccountBalancesPie.vue";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            IncomAndConsumptionTrend, AccountBalancesPie
        }
    })
    export default class StatisticsVue extends Vue {


    }
</script>

