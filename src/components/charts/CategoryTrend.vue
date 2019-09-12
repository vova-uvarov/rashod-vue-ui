<template>
    <v-card>
        <v-row>
            <v-col cols="6" offset="3">
                {{title}}
            </v-col>
        </v-row>
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
                            v-model="categoryIds"
                            :clearable="true"
                            multiple
                            :search-input.sync="searchCategoryValue"
                            @change="searchCategoryValue = ''"
                            label="Категории"
                    ></v-combobox>
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
    import StatisticsService from "@/services/StatisticsService";

    @Component({
        components: {LineChart}
    })
    export default class AverageByDayTrend extends Vue {
        mounted() {
            this.loadData();
        }


        @Watch("dateFrom")
        dateFromChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("dateTO")
        dateToChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("categoryIds")
        categoryIdsChanged(value: string, oldValue: string) {
            this.loadData();
        }

        private loadData() {
            StatisticsService.categoryTrend(this.dateFrom, this.dateTo, this.categoryIds)
                .then((responseData) => {
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

        get title() {
            return "Динамика по категории в разрезе месяцев: " + this.categoryIds.map((c) => (c.text)).join(",");
        }

        get options() {
            return {
                maintainAspectRatio: false, aspectRatio: 1,
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
                        borderColor: this.getRandomColor(item.name),
                        data: item.data
                    };
                });
            }
            return [];
        }

        data() {
            return {
                dateToMenu: false,
                dateFromMenu: false,
                dateFrom: null,
                dateTo: null,
                rawData: {},
                categoryIds: [{text: "Продукты", value: 32}], // todo
                searchCategoryValue: "",
            };
        }

        getRandomColor(year: number) {
            console.log("year="+year);
            if (year==2012){
                return "#CD6155"
            }
            if (year==2013){
                return "#9B59B6"
            }
            if (year==2014){
                return "#AED6F1"
            }
            if (year==2015){
                return "#A2D9CE"
            }
            if (year==2016){
                return "#F7DC6F"
            }
            if (year==2017){
                return "AQUA"
            }
            if (year==2018){
                return "PURPLE"
            }
            if (year==2019){
                return "OLIVE"
            }
            if (year==2020){
                return "YELLOW"
            }
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

    }
</script>

<style>

</style>
