<template>
    <div>
        <line-chart :chart-data="datacollection"
                    :options="options"></line-chart>
    </div>
</template>

<script lang="ts">
    import LineChart from "./LineChart.js";
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({
        components: {LineChart}
    })
    export default class IncomAndConsumptionByMonth extends Vue {

        @Prop()
        rawData: object;
        @Prop()
        title: string;

        get datacollection() {
            return {
                // labels: this.rawData.labels,
                labels: this.extractLabels(this.rawData.labels),
                datasets: this.extractDatasets(this.rawData.datasets)
            };
        }

        get options() {
            return {
                maintainAspectRatio: false, aspectRatio: 1,
                title: {
                    display: true,
                    text: this.title
                },
                legend:
                    {
                        position: "bottom",
                        labels: {
                            usePointStyle: true
                        }
                    }
            };
        }


        extractLabels(labels) {
            if (labels) {
                return labels;
            }
            return [];
        }


        extractDatasets(datasets) {
            if (datasets) {
                return datasets.map((item) => {
                    return {
                        lineTension: 0,
                        label: item.name,
                        fill: false,
                        borderColor: this.getColorByDataSetName(item.name),
                        data: item.data
                    };
                });
            }
            return [];
        }


        getColorByDataSetName(dataSetName) {
            if (dataSetName === "Доход") {
                return "green";
            }
            if (dataSetName === "Расход") {
                return "red";
            }
            return "black";
        }


    }
</script>

<style>

</style>
