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
    </v-card>
</template>

<script lang="ts">
import BarChart from './js/BarChart.js';
import {Component,  Vue, Watch} from 'vue-property-decorator';
import StatisticsService from '@/services/StatisticsService';
import SelectDate from "@/components/common/SelectDate.vue";

@Component({
    components: {BarChart, SelectDate},
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
            // labels: this.rawData.labels,
            labels: this.extractLabels(this.rawData.labels),
            datasets: this.extractDatasets(this.rawData.datasets),
        };
    }

    get options() {
        return {
            maintainAspectRatio: false, aspectRatio: 1,
            title: {
                display: true,
                text: 'Расход по дня',
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
    public dateFromMenu = false;
    public dateToMenu = false;
    public dateFrom = IncomAndConsumptionTrend.fromDateInitValue().toISOString().substr(0, 10);
    public dateTo = new Date().toISOString().substr(0, 10);
    public groupBy = 'DAY';
    public incomeConsumptionByMonth = {};
    public excludeCategoryIds = [{text: 'ИП', value: 15}]; // todo
    public searchCategoryValue = '';
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

    public extractLabels(labels: any) {
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
                            if (d < 1000) {
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
