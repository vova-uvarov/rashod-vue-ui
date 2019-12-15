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
        <ShortOperationsListDialog :dateFrom="clickOperationDate" :dateTo="clickOperationDate"
                                   :excludeCategoryIds="excludeCategoryIds"
                                   :visible="showOperationsDialog"
                                   @close="showOperationsDialog=false"/>
    </v-card>

</template>


<script lang="ts">
import LineChart from './js/LineChart.js';
import {Component, Vue, Watch} from 'vue-property-decorator';
import StatisticsService from '@/services/StatisticsService';
import ShortOperationsListDialog from '@/components/operation/ShortOperationsListDialog';

@Component({
    components: {LineChart, ShortOperationsListDialog},
})
export default class AverageByDayTrend extends Vue {


    get categories() {
        return this.$store.state.categories.map((val: any) => ({
            text: val.name,
            value: val.id,
        }));
    }

    get datacollection() {
        return {
            labels: this.extractLabels(this.rawData.labels),
            datasets: this.extractDatasets(this.rawData.datasets),
        };
    }

    get options() {
        var _this = this;
        return {
            maintainAspectRatio: false, aspectRatio: 1,
            onClick: function(point: any, elements: any) {
                if (elements[0]) {
                    let index = elements[0]._index;
                    let operationDate = _this.rawData.dates[index];
                    console.log(JSON.stringify(operationDate));
                    _this.showOperationsDialog = true;
                    _this.clickOperationDate = operationDate;
                }
            },
            title: {
                display: true,
                text: 'Динамика среднего расхода',
            },
            legend:
                {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                    },
                },
        };
    }

    public clickOperationDate: any = null;
    public rawData: any = {};
    public excludeCategoryIds = [{text: 'ИП', value: 15}];
    public searchCategoryValue = '';
    public showOperationsDialog = false;
    public mounted() {
        this.loadData();
    }

    @Watch('excludeCategoryIds')
    public excludeCategoryIdsChanged(value: string, oldValue: string) {
        this.loadData();
    }

    public extractLabels(labels: any) {
        if (labels) {
            return labels;
        }
        return [];
    }


    public extractDatasets(datasets: any) {
        if (datasets) {
            return datasets.map((item: any) => {
                return {
                    lineTension: 0,
                    label: item.name,
                    fill: false,
                    borderColor: 'green',
                    data: item.data,
                };
            });
        }
        return [];
    }

    private loadData() {
        StatisticsService.averageByDayInCurrMonth(
            this.excludeCategoryIds,
        ).then((responseData) => {
            this.rawData = responseData;
        });
    }

}
</script>

<style>

</style>
