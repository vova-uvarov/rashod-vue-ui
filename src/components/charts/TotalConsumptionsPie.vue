<template>
    <div class="small">
        <PieChart :chart-data="datacollection" :options="options"></PieChart>
    </div>
</template>

<script lang="ts">
    import PieChart from "./js/PieChart.js";
    import StatisticsService from "@/services/StatisticsService";
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({
        components: {PieChart}
    })
    export default class TotalConsumptionPie extends Vue {
        @Prop()
        sumCalculatorType!: string;

        @Prop()
        year: number | undefined;

        @Prop()
        dateFrom: any;

        @Prop()
        dateTo: any;

        @Prop()
        operationType!: string;

        @Prop()
        title!: string;

        consumptionsByCategory = [];
        datacollection = {};
        options: any = {
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

        @Watch("year")
        yearChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("dateFrom")
        dateFromChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("dateTo")
        dateToChaged(value: string, oldValue: string) {
            this.loadData();
        }

        mounted() {
            this.loadData();
        }

        private loadData() {
            let dateFrom: any = null;
            let dateTo: any = null;
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
            console.log("call sumsGroupByCategory with from: " + dateFrom + " to: " + dateTo);
            StatisticsService.sumsGroupByCategory(
                {
                    operationTypes: [this.operationType],
                    from: dateFrom,
                    to: dateTo,
                    calculatorType: this.sumCalculatorType
                })
                .then((data: any) => {
                    console.log("call then sumsGroupByCategory with from: " + dateFrom + " to: " + dateTo);
                    this.consumptionsByCategory = data;
                    this.fillData();
                });
        }

        fillData() {
            this.datacollection = {
                datasets: [{
                    backgroundColor: this.consumptionsByCategory.map((a) => (this.getRandomColor())),
                    data: this.consumptionsByCategory.map((a: any) => (a.data[0])) // 0 для pie всегда один элемент
                }],


                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: this.consumptionsByCategory.map((a: any) => (a.name))


            };
        }

        getRandomColor() {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
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
