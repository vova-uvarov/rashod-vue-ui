<template>
    <v-container>
        <h1>Статистика</h1>
        <RandomPie/>
        <RandomChart/>
    </v-container>
</template>
<script lang="ts">
    import RandomChart from "../components/charts/RandomChart.vue";
    import RandomPie from "../components/charts/RandomPie.vue";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            RandomChart,RandomPie
        }
    })
    export default class StatisticsVue extends Vue {
    }
</script>
