<template>
    <div class="small">
        dateFrom={{dateFrom}} <br/>
        dateTo={{dateTo}}<br/>
        consumptionsByCategory={{consumptionsByCategory}}<br/>
        datacollection={{datacollection}}
        <PieChart :chart-data="datacollection" :options="options"></PieChart>
    </div>
</template>

<script lang="ts">
    import PieChart from "./PieChart.js";
    import StatisticsService from "@/services/StatisticsService";
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({
        components: {PieChart}
    })
    export default class TotalConsumptionPie extends Vue {
        @Prop()
        year: number;

        @Prop()
        dateFrom: any;

        @Prop()
        dateTo: any;

        @Prop()
        operationType: string;

        @Prop()
        title: string;


        data() {
            return {
                balances: [],
                datacollection: {},
                options: {
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
                }
            };
        }

        @Watch("year")
        yearChanged(value: string, oldValue: string) {
            this.loadData();
        }

        mounted() {
            this.loadData();
        }

        private loadData() {
            let dateFrom = null;
            let dateTo = null;
            if (this.year) {
                dateFrom = this.year + "-01-01"; // todo стремная штука
                dateTo = this.year + "-12-31";// todo стремная штука
            } else {
                if (this.dateFrom) {
                    dateFrom = this.dateFrom;
                }
                if (this.dateTo) {
                    dateTo = this.dateTo;
                }
            }
            StatisticsService.sumsGroupByCategory(
                {
                    operationTypes: [this.operationType],
                    from: dateFrom,
                    to: dateTo
                })
                .then((data) => {
                    this.consumptionsByCategory = data;
                    this.fillData();
                });
        }

        fillData() {
        // |     property 'datasets' -> object with constructor 'Array'
        //     |     index 0 -> object with constructor 'Object'
        //     |     ...
        // |     property 'config' -> object with constructor 'Object'
        //     --- property 'data' closes the circle"
            this.datacollection = {
                datasets: [{
                    backgroundColor: this.consumptionsByCategory.map((a) => (this.getRandomColor())),
                    data: this.consumptionsByCategory.map((a) => (a.data[0])) // 0 для pie всегда один элемент
                }],


                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: this.consumptionsByCategory.map((a) => (a.name))


            };
        }

        getRandomColor() {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    };
</script>

<style>
    .small {
        max-width: 400px;
        margin: 100px auto;
    }
</style>
