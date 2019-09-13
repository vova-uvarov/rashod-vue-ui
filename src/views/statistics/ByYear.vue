<template>
    <v-container fluid class="pa-2">
        months = {{months}}
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

        <v-row v-for="rowIndex in rows">
            <v-col cols="4" v-for="colIndex in [0,1,2]" :key="colIndex">
                {{monthNames[rowIndex*3+colIndex]}} = {{months[rowIndex*3+colIndex].from}}-{{months[rowIndex*3+colIndex].to}}
                <TotalConsumptionsPie operation-type="CONSUMPTION" :title="'Расходы за: '+monthNames[rowIndex*3+colIndex] "
                                      :date-from="months[rowIndex*3+colIndex].from" :date-to="months[rowIndex*3+colIndex].to"/>

            </v-col>
        </v-row>
    </v-container>

</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TotalConsumptionsPie from "@/components/charts/TotalConsumptionsPie.vue";

    @Component({
        components: {
            TotalConsumptionsPie
        }
    })
    export default class StatisticsVue extends Vue {

        get monthNames() {
            return ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
        }
        get months() {
            console.log("get months");
            let months = [];
            for (let i = 0; i < 12; i++) {
                months.push({
                    from: new Date(this.year, i, 1, 3, 0, 0).toISOString().substr(0, 10), // todo тут надо с часовыми поясами разобраться
                    to: new Date(this.year, i + 1, 0, 23, 59, 59).toISOString().substr(0, 10), // todo тут надо с часовыми поясами разобраться
                });
            }
            return months;
        }

        get rows(){
            return [0,1,2,3];
        }
        get years() {
            return [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012]; // todo Стоит этот список генерировать
        }

        data() {
            return {
                year: 2019 // todo нужн брать текущий год
            };
        }
    }
</script>

