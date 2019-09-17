<template>
    <v-container fluid class="pa-2">
        <v-row>
            <v-col cols="12">
                <v-select
                        :items="years"
                        v-model="year"
                        :clearable="false"
                        label="Год"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <TotalConsumptionsPie operation-type="CONSUMPTION" title="Расходы за год" :year="year"/>
            </v-col>
            <v-col cols="6">
                <TotalConsumptionsPie operation-type="INCOME" title="Доходы за год" :year="year"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <TotalConsumptionsPie operation-type="CONSUMPTION"
                                      title="Расходы в среднем за год"
                                      :year="year"
                                      sum-calculator-type="MONTH_AVERAGE"
                />
            </v-col>
            <v-col cols="6">
                <TotalConsumptionsPie operation-type="INCOME" title="Доходы в среднем за год"
                                      :year="year" sum-calculator-type="MONTH_AVERAGE"/>
            </v-col>
        </v-row>

        <v-row v-for="rowIndex in  [0, 1, 2, 3]">
            <v-col cols="4" v-for="colIndex in [0,1,2]" :key="colIndex">
                <TotalConsumptionsPie operation-type="CONSUMPTION"
                                      :title="'Расходы за: '+monthNames[rowIndex*3+colIndex] "
                                      :date-from="months[rowIndex*3+colIndex].from"
                                      :date-to="months[rowIndex*3+colIndex].to"/>
            </v-col>
        </v-row>
    </v-container>

</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TotalConsumptionsPie from '@/components/charts/TotalConsumptionsPie.vue';

@Component({
    components: {
        TotalConsumptionsPie,
    },
})
export default class StatisticByYear extends Vue {
    get months() {
        const months = [];
        for (let i = 0; i < 12; i++) {
            months.push({
                // todo тут надо с часовыми поясами разобраться
                from: new Date(this.year, i, 1, 3, 0, 0).toISOString().substr(0, 10),
                // todo тут надо с часовыми поясами разобраться
                to: new Date(this.year, i + 1, 0, 23, 59, 59).toISOString().substr(0, 10),
            });
        }
        return months;
    }

    get years() {
        return this.$store.state.dictionaries.years;
    }

    public year = 2019;
    public monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
}
</script>

