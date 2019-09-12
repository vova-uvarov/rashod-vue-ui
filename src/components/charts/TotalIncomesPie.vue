<template>
    <div class="small">
        <PieChart :chart-data="datacollection" :options="options"></PieChart>
    </div>
</template>

<script>
    import PieChart from './PieChart.js'
    import StatisticsService from "@/services/StatisticsService";

    export default {
        components: {
            PieChart
        },
        data() {
            return {
                balances: [],
                datacollection: null,
                options: {
                    title: {
                        display: true,
                        text: "Доходы за все время"
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
        mounted() {

            StatisticsService.sumsGroupByCategory({operationTypes: ["INCOME"]})
                .then((data) => {
                    this.incomesByCategory = data;
                    this.fillData()
                });
        },
        methods: {
            fillData() {
                this.datacollection = {
                    datasets: [{
                        backgroundColor: this.incomesByCategory.map((a) => (this.getRandomColor())),
                        data: this.incomesByCategory.map((a) => (a.sum))
                    }],


                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: this.incomesByCategory.map((a) => (a.name))


                }
            },
            getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            },
        }
    }
</script>

<style>
    .small {
        max-width: 400px;
        margin: 100px auto;
    }
</style>
