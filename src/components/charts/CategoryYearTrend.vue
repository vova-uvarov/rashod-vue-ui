<template>
    <v-card>
        <v-row>
            <v-col cols="6" offset="3">
                {{title}}
            </v-col>
        </v-row>
        <v-card-title>

            <v-row>
                <v-col cols="12">
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
import LineChart from './js/LineChart.js';
import {Component, Vue, Watch} from 'vue-property-decorator';
import StatisticsService from '@/services/StatisticsService';

@Component({
    components: {LineChart},
})
export default class CategoryYearTrend extends Vue {


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

    get title() {
        return 'Динамика по категории: ' + this.categoryIds.map((c) => (c.text)).join(',');
    }

    get options() {
        return {
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

    public rawData: any = {};
    public categoryIds = [{text: 'Продукты', value: 32}]; // todo
    public searchCategoryValue = '';
    public mounted() {
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
                    borderColor: this.getRandomColor(),
                    data: item.data,
                };
            });
        }
        return [];
    }

    public getRandomColor() {

        return 'blue';
    }

    private loadData() {
        StatisticsService.averageByYearTrend(this.categoryIds)
            .then((responseData) => {
                this.rawData = responseData;
            });
    }

}
</script>

<style>

</style>
