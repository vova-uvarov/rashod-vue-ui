<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="3">
                    <select-date label="Дата C" :date.sync="dateFrom"/>
                </v-col>
                <v-col cols="3">
                    <select-date label="Дата По" :date.sync="dateTo"/>
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
import LineChart from './js/LineChart.js';
import {Component, Vue, Watch} from 'vue-property-decorator';
import StatisticsService from '@/services/StatisticsService';
import SelectDate from "@/components/common/SelectDate.vue";

@Component({    components: {LineChart,SelectDate},})
export default class IncomAndConsumptionTrend extends Vue {


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
        return {
            maintainAspectRatio: false, aspectRatio: 1,
            title: {
                display: true,
                text: 'Доход/Расход динамика',
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

    private static dateFromInitValue() {
        const now = new Date();
        now.setDate(now.getDate() - 365);
        return now;
    }

    public rawData: any = {};
    public dateFrom = IncomAndConsumptionTrend.dateFromInitValue().toISOString().substr(0, 10);
    public dateTo = new Date().toISOString().substr(0, 10);
    public groupBy = 'MONTH';
    public excludeCategoryIds = [];
    public searchCategoryValue = '';
    public mounted() {
        this.loadData();
    }

    @Watch('groupBy')
    public groupByChanged(value: string, oldValue: string) {
        this.loadData();
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
                    borderColor: this.getColorByDataSetName(item.name),
                    data: item.data,
                };
            });
        }
        return [];
    }


    public getColorByDataSetName(dataSetName: string) {
        if (dataSetName === 'Доход') {
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
