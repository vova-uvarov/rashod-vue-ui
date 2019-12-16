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
                    <select-date label="Дата C" :date.sync="dateFrom"/>
                </v-col>
                <v-col cols="4">
                    <select-date label="Дата По" :date.sync="dateTo"/>
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

        <ShortOperationsListDialog :dateFrom="clickOperationDate" :dateTo="clickOperationDate"
                                   :excludeCategoryIds="excludeCategoryIds"
                                   :visible="showOperationsDialog"
                                   @close="showOperationsDialog=false"/>
    </v-card>
</template>

<script lang="ts">
import BarChart from './js/BarChart.js';
import {Component,  Vue, Watch} from 'vue-property-decorator';
import StatisticsService from '@/services/StatisticsService';
import SelectDate from "@/components/common/SelectDate.vue";
import ShortOperationsListDialog from '@/components/operation/ShortOperationsListDialog';

@Component({
    components: {BarChart, SelectDate, ShortOperationsListDialog},
})
export default class IncomAndConsumptionTrend extends Vue {


    get categories() {
        return this.$store.state.categories.map((val: any) => ({
            text: val.name,
            value: val.id,
        }));
    }

    get datacollection() {
        return {
            labels: this.defaultIfNull(this.rawData.labels),
            datasets: this.extractDatasets(this.rawData.datasets),
        };
    }

    get options() {
        var _this = this;
        return {
            onClick: function(point: any, elements: any) {
                if (elements[0]) {
                    let index = elements[0]._index;
                    _this.clickOperationDate = _this.rawData.dates[index];
                    _this.showOperationsDialog = true;
                }
            },
            maintainAspectRatio: false, aspectRatio: 1,
            title: {
                display: true,
                text: 'Расход по дням',
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


    private static fromDateInitValue() {
        const now = new Date();
        now.setDate(now.getDate() - 31);
        return now;
    }

    public monthPlan = {};
    public rawData: any = {};
    public dateFrom = IncomAndConsumptionTrend.fromDateInitValue().toISOString().substr(0, 10);
    public dateTo = new Date().toISOString().substr(0, 10);
    public groupBy = 'DAY';
    public excludeCategoryIds = [{text: 'ИП', value: 15}]; // todo
    public searchCategoryValue = '';
    public showOperationsDialog = false;
    public clickOperationDate: any = null;
    public mounted() {
        this.loadData();
        StatisticsService.monthPlan()
            .then((responseData) => {
                this.monthPlan = responseData;
            });
    }

    @Watch('dateFrom')
    public dateFromChanged(value: string, oldValue: string) {
        this.loadData();
    }

    @Watch('dateTo')
    public dateToChanged(value: string, oldValue: string) {
        this.loadData();
    }

    @Watch('excludeCategoryIds')
    public excludeCategoryIdsChanged(value: string, oldValue: string) {
        this.loadData();
    }

    public defaultIfNull(labels: any) {
        if (labels) {
            return labels;
        }
        return [];
    }


    public extractDatasets(datasets: any) {
        if (datasets) {
            return datasets.filter((item: any) => (item.name === 'Расход'))
                .map((item: any) => {
                    return {
                        lineTension: 0,
                        label: item.name,
                        fill: false,
                        borderColor: this.getColorByDataSetName(item.name),
                        backgroundColor: item.data.map((d: any) => {
                            if (d < 1000) { // todo числа и цвета должны быть в настройках
                                return 'green';
                            }
                            if (d < 2000) {
                                return 'orange';
                            }
                            return 'red';
                        }),
                        data: item.data,
                    };
                });
        }
        return [];
    }

    public getColorByDataSetName(dataSetName: any) {
        if (dataSetName === 'Доход') { // тоже должно быть в настройках
            return 'green';
        }
        if (dataSetName === 'Расход') {
            return 'red';
        }
        return 'black';
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


}
</script>

<style>

</style>
