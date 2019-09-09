<template>
    <v-container fluid class="pa-2">

        <v-row>
            <v-col cols="6">
                <v-card max-width="300">
                    <RandomPie/>
                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card max-width="300">
                    <RandomChart/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>
<script lang="ts">
    import RandomChart from "../components/charts/RandomChart.vue";
    import RandomPie from "../components/charts/RandomPie.vue";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            RandomChart, RandomPie
        }
    })
    export default class StatisticsVue extends Vue {


    }
</script>

