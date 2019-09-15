<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="12">
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

        <line-chart :chart-data="datacollection"
                    :options="options"></line-chart>
    </v-card>
</template>


<script lang="ts">
    import LineChart from "./LineChart.js";
    import {Component, Vue, Watch} from "vue-property-decorator";
    import StatisticsService from "@/services/StatisticsService";

    @Component({
        components: {LineChart}
    })
    export default class AverageByDayTrend extends Vue {
        mounted() {
            this.loadData();
        }

        @Watch("excludeCategoryIds")
        excludeCategoryIdsChanged(value: string, oldValue: string) {
            this.loadData();
        }

        private loadData() {
            StatisticsService.averageByDayInCurrMonth(
                this.excludeCategoryIds
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
                labels: this.extractLabels(this.rawData.labels),
                datasets: this.extractDatasets(this.rawData.datasets)
            };
        }

        get options() {
            return {
                maintainAspectRatio: false, aspectRatio: 1,
                title: {
                    display: true,
                    text: "Динамика среднего расхода"
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
                return datasets.map((item: any) => {
                    return {
                        lineTension: 0,
                        label: item.name,
                        fill: false,
                        borderColor: "green",
                        data: item.data
                    };
                });
            }
            return [];
        }

        rawData = {};
        excludeCategoryIds = [{text: "ИП", value: 15}];
        searchCategoryValue = "";

    }
</script>

<style>

</style>
