<template>
    <div class="small">
        <PieChart :chart-data="datacollection" :options="options"></PieChart>
    </div>
</template>

<script lang="ts">
import PieChart from './js/PieChart.js';
import StatisticsService from '@/services/StatisticsService';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component({
    components: {PieChart},
})
export default class TotalConsumptionPie extends Vue {
    @Prop()
    public sumCalculatorType!: string;

    @Prop()
    public year: number | undefined;

    @Prop()
    public dateFrom: any;

    @Prop()
    public dateTo: any;

    @Prop()
    public operationType!: string;

    @Prop()
    public title!: string;

    public consumptionsByCategory = [];
    public datacollection = {};
    public options: any = {
        title: {
            display: true,
            text: this.title,
        },
        legend:
            {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                },
            },
    };

    @Watch('year')
    public yearChanged(value: string, oldValue: string) {
        this.loadData();
    }

    @Watch('dateFrom')
    public dateFromChanged(value: string, oldValue: string) {
        this.loadData();
    }

    @Watch('dateTo')
    public dateToChaged(value: string, oldValue: string) {
        this.loadData();
    }

    public mounted() {
        this.loadData();
    }

    public fillData() {
        this.datacollection = {
            datasets: [{
                backgroundColor: this.consumptionsByCategory.map((a) => (this.getRandomColor())),
                data: this.consumptionsByCategory.map((a: any) => (a.data[0])), // 0 для pie всегда один элемент
            }],


            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.consumptionsByCategory.map((a: any) => (a.name)),


        };
    }

    public getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private loadData() {
        let dateFrom: any = null;
        let dateTo: any = null;
        if (this.year) {
            dateFrom = this.year + '-01-01'; // todo стремная штука
            dateTo = this.year + '-12-31'; // todo стремная штука
        } else {
            if (this.dateFrom) {
                dateFrom = this.dateFrom;
            }
            if (this.dateTo) {
                dateTo = this.dateTo;
            }
        }
        console.log('call sumsGroupByCategory with from: ' + dateFrom + ' to: ' + dateTo);
        StatisticsService.sumsGroupByCategory(
            {
                operationTypes: [this.operationType],
                from: dateFrom,
                to: dateTo,
                calculatorType: this.sumCalculatorType,
            })
            .then((data: any) => {
                console.log('call then sumsGroupByCategory with from: ' + dateFrom + ' to: ' + dateTo);
                this.consumptionsByCategory = data;
                this.fillData();
            });
    }
}
</script>

<style>
    .small {
        max-width: 400px;
        margin: 100px auto;
    }
</style>
