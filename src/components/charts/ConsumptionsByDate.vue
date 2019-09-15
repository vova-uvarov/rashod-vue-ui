<template>
    <v-card>
        <v-chip class="ma-2" color="primary" outlined>
            <b>План на месяц:</b> {{monthPlan.totalPlan|moneyFormat}}
        </v-chip>
        <v-chip class="ma-2" color="primary" outlined>
            <b>План на день:</b> {{monthPlan.planForDay|moneyFormat}}
        </v-chip>

        <v-chip class="ma-2" color="primary" outlined>
            <b>В среднем тратим:</b> {{monthPlan.currentAverageSum|moneyFormat}}
        </v-chip>

        <v-chip class="ma-2" color="primary" outlined>
            <b>Можно потратить:</b> {{monthPlan.canSpent|moneyFormat}}
        </v-chip>

        <v-chip class="ma-2" color="primary" outlined>
            <b>Выйти в ноль:</b> {{monthPlan.canSpendForPlan|moneyFormat}}
        </v-chip>

        <v-card-title>
            <v-row>
                <v-col cols="4">
                    <!--                todo нужно сделать компонент даты-->
                    <v-menu
                            v-model="dateFromMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="dateFrom"
                                    label="Дата C"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateFrom"
                                       @input="dateFromMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="4">
                    <!--                todo нужно сделать компонент даты-->
                    <v-menu
                            v-model="dateToMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="dateTo"
                                    label="Дата По"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateTo"
                                       @input="dateToMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="4">
                    <v-combobox
                            :items="categories"
                            v-model="excludeCategoryIds"
                            :clearable="true"
                            multiple
                            :search-input.sync="searchCategoryValue"
                            @change="searchCategoryValue = ''"
                            label="Исключить категории"
                    ></v-combobox>
                </v-col>
            </v-row>
        </v-card-title>

        <bar-chart :chart-data="datacollection"
                   :options="options"></bar-chart>
    </v-card>
</template>

<script lang="ts">
    import BarChart from "./BarChart.js";
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import StatisticsService from "@/services/StatisticsService";

    @Component({
        components: {BarChart}
    })
    export default class IncomAndConsumptionTrend extends Vue {
        mounted() {
            this.loadData();
            StatisticsService.monthPlan()
                .then((responseData) => {
                    this.monthPlan = responseData;
                });
        }

        @Watch("dateFrom")
        dateFromChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("dateTo")
        dateToChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("excludeCategoryIds")
        excludeCategoryIdsChanged(value: string, oldValue: string) {
            this.loadData();
        }

        private loadData() {
            StatisticsService.incomeConsumptionByGroup(
                this.dateFrom,
                this.dateTo,
                this.excludeCategoryIds,
                this.groupBy,
            ).then((responseData) => {
                this.rawData = responseData;
            });
        }


        get categories() {
            return this.$store.state.categories.map((val: any) => ({
                text: val.name,
                value: val.id
            }));
        }

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
                    text: "Расход по дня"
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

        extractLabels(labels: any) {
            if (labels) {
                return labels;
            }
            return [];
        }


        extractDatasets(datasets: any) {
            if (datasets) {
                return datasets.filter((item: any) => (item.name == "Расход"))
                    .map((item: any) => {
                        return {
                            lineTension: 0,
                            label: item.name,
                            fill: false,
                            borderColor: this.getColorByDataSetName(item.name),
                            backgroundColor: item.data.map((d: any) => {
                                if (d < 1000) {
                                    return "green";
                                }
                                if (d < 2000) {
                                    return "orange";
                                }
                                return "red";
                            }),
                            data: item.data
                        };
                    });
            }
            return [];
        }

        monthPlan = {};
        rawData: any = {};
        dateFromMenu = false;
        dateToMenu = false;
        dateFrom = IncomAndConsumptionTrend.fromDateInitValue().toISOString().substr(0, 10);
        dateTo = new Date().toISOString().substr(0, 10);
        groupBy = "DAY";
        incomeConsumptionByMonth = {};
        excludeCategoryIds = [{"text": "ИП", "value": 15}]; // todo
        searchCategoryValue = "";


        private static fromDateInitValue() {
            const now = new Date();
            now.setDate(now.getDate() - 31);
            return now;
        }

        getColorByDataSetName(dataSetName: any) {
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
