<template>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="3">
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
                    <v-col cols="3">
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
                    <v-col cols="3">
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
                    <v-col cols="3">
<!--                        todo список группировок думаю нужно сделать справочником на бэке-->
                        <v-select
                                :items="[{text: 'Месяц', value: 'MONTH'},{text: 'Год', value: 'YEAR'}]"
                                v-model="groupBy"
                                label="Группировка"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-title>

            <line-chart :chart-data="datacollection"
                        :options="options"></line-chart>
        </v-card>
</template>

<script lang="ts">
    import LineChart from "./LineChart.js";
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import StatisticsService from '@/services/StatisticsService';

    @Component({
        components: {LineChart}
    })
    export default class IncomAndConsumptionTrend extends Vue {
        mounted() {
            this.loadData();
        }

        @Watch("groupBy")
        groupByChanged(value: string, oldValue: string) {
            this.loadData();
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
            return this.$store.state.categories.map(val => ({
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
                    text: "Доход/Расход динамика"
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

        data() {
            const now = new Date();
            now.setDate(now.getDate() - 365);
            return {
                rawData: {},
                dateFromMenu: false,
                dateToMenu: false,
                dateFrom: now.toISOString().substr(0, 10),
                dateTo: new Date().toISOString().substr(0, 10),
                groupBy: 'MONTH',
                excludeCategoryIds: [],
                searchCategoryValue: "",
            };
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
