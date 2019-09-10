<template>
    <div>
        <line-chart :chart-data="datacollection"
                    :options="options"></line-chart>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'

    export default {
        components: {
            LineChart
        },
        props: ['rawData','title'],

        computed: {
            datacollection: function () {
                return {
                    // labels: this.rawData.labels,
                    labels: this.extractLabels(this.rawData.labels),
                    datasets: this.extractDatasets(this.rawData.datasets)
                }
            },
            options: function () {

                return {
                    maintainAspectRatio: false, aspectRatio: 1,
                    title: {
                        display: true,
                        text: this.title
                    },
                    legend:
                        {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true
                            }
                        }
                }
            }
        },

        data() {
            return {}
        },

        methods: {
            extractLabels(labels) {
                if (labels) {
                    return labels;
                }
                return [];
            },
            extractDatasets(datasets) {
                if (datasets) {
                    return datasets.map((item) => {
                        return {
                            lineTension: 0,
                            label: item.name,
                            fill: false,
                            borderColor: this.getColorByDataSetName(item.name),
                            data: item.data
                        }
                    });
                }
                return [];
            },
            getColorByDataSetName(dataSetName) {
                if (dataSetName === 'Доход') {
                    return "green";
                }
                if (dataSetName === 'Расход') {
                    return "red";
                }
                return "black"
            }
        }

    }
</script>

<style>
    .small {
    }
</style>
