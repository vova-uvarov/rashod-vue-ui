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
                    <select-date label="Дата C" :date.sync="dateFrom"/>
                </v-col>
                <v-col cols="4">
                    <select-date label="Дата По" :date.sync="dateTo"/>
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

        <ShortOperationsListDialog :dateFrom="clickOperationDateFrom" :dateTo="clickOperationDateTo"
                                   :categoryIds="categoryIds"
                                   :visible="showOperationsDialog"
                                   @close="showOperationsDialog=false"/>
    </v-card>
</template>


<script lang="ts">
import LineChart from './js/LineChart.js';
import {Component,  Vue, Watch} from 'vue-property-decorator';
import StatisticsService from '@/services/StatisticsService';
import SelectDate from "@/components/common/SelectDate.vue";
import ShortOperationsListDialog from '@/components/operation/ShortOperationsListDialog';


@Component({
    components: {LineChart, SelectDate,ShortOperationsListDialog},
})
export default class CategoryTrend extends Vue {


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

    get title() {
        return 'Динамика по категории в разрезе месяцев: ' + this.categoryIds.map((c) => (c.text)).join(',');
    }

    get options() {
        var _this = this;
        return {
            onClick: function(point: any) {
                let elementAtEvent = (this as any).getElementAtEvent(point);

                if (elementAtEvent[0]) {
                    let index = elementAtEvent[0]._index;
                    _this.clickOperationDateFrom = _this.rawData.datasets[elementAtEvent[0]._datasetIndex].dates[index];
                    // todo тут надо с часовыми поясами разобраться
                    let dateFrom = new Date(_this.clickOperationDateFrom);
                    _this.clickOperationDateTo = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 1, 0, 23, 59, 59).toISOString().substr(0, 10);
                    _this.showOperationsDialog = true;
                }
            },
            maintainAspectRatio: false, aspectRatio: 1,
            legend:
                {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                    },
                },
        };
    }

    public clickOperationDateFrom: any = null;
    public clickOperationDateTo: any = null;
    public showOperationsDialog = false;
    public dateFrom = null;
    public dateTo = null;
    public rawData: any = {};
    public categoryIds = [{text: 'Продукты', value: 32}]; // todo
    public searchCategoryValue = '';
    public mounted() {
        this.loadData();
    }


    @Watch('dateFrom')
    public dateFromChanged(value: string, oldValue: string) {
        this.loadData();
    }

    @Watch('dateTO')
    public dateToChanged(value: string, oldValue: string) {
        this.loadData();
    }

    @Watch('categoryIds')
    public categoryIdsChanged(value: string, oldValue: string) {
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
                    borderColor: this.getRandomColor(item.name),
                    data: item.data,
                };
            });
        }
        return [];
    }

    public getRandomColor(year: number) {
        //todo цвета вынести в настройки в каком-то виде
        if (year === 2012) {
            return '#CD6155';
        }
        if (year === 2013) {
            return '#9B59B6';
        }
        if (year === 2014) {
            return '#AED6F1';
        }
        if (year === 2015) {
            return '#A2D9CE';
        }
        if (year === 2016) {
            return '#F7DC6F';
        }
        if (year === 2017) {
            return 'AQUA';
        }
        if (year === 2018) {
            return 'PURPLE';
        }
        if (year === 2019) {
            return 'OLIVE';
        }
        if (year === 2020) {
            return 'YELLOW';
        }
        if (year === 2021) {
            return '#0942d0';
         }
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private loadData() {
        StatisticsService.categoryTrend(this.dateFrom, this.dateTo, this.categoryIds)
            .then((responseData) => {
                this.rawData = responseData;
            });
    }

}
</script>

<style>

</style>
