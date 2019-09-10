<template>
    <v-container fluid class="pa-2">
        <v-row>
            <v-col cols="4">
                <v-card>
                    <AccountBalancesPie/>
                </v-card>
            </v-col>

        </v-row>
        <v-row>
            <v-row>
                <v-col cols="3">
                    <!--                todo нужно сделать компонент даты-->
                    <v-menu
                            v-model="dateFromMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="dateFrom"
                                    label="Дата C"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateFrom"
                                       @input="dateFromMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="3">
                    <!--                todo нужно сделать компонент даты-->
                    <v-menu
                            v-model="dateToMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="dateTo"
                                    label="Дата По"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateTo"
                                       @input="dateToMenu = false"></v-date-picker>
                    </v-menu>
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
                    <v-select
                            :items="[{text: 'Месяц', value: 'MONTH'},{text: 'Год', value: 'YEAR'}]"
                            v-model="groupBy"
                            label="Группировка"
                    ></v-select>
                </v-col>
            </v-row>
            <v-col cols="12">
                <v-card>
                    <IncomAndConsumptionByMonth :raw-data="incomeConsumptionByMonth"
                                                title="Доход/Расход по месяцам"/>
                </v-card>
            </v-col>
        </v-row>

    </v-container>

</template>
<script lang="ts">
    import IncomAndConsumptionByMonth from "../components/charts/IncomAndConsumptionByMonth.vue";
    import AccountBalancesPie from "../components/charts/AccountBalancesPie.vue";
    import {Component, Vue, Watch} from "vue-property-decorator";
    import StatisticsService from '@/services/StatisticsService';

    @Component({
        components: {
            IncomAndConsumptionByMonth, AccountBalancesPie
        }
    })
    export default class StatisticsVue extends Vue {
        mounted() {
            this.loadData();
        }

        @Watch("groupBy")
        groupByChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("dateFrom")
        dateFromChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("dateTo")
        dateToChanged(value: string, oldValue: string) {
            this.loadData();
        }

        @Watch("excludeCategoryIds")
        excludeCategoryIdsChanged(value: string, oldValue: string) {
            this.loadData();
        }

        private loadData() {
            StatisticsService.incomeConsumptionByGroup(
                this.dateFrom,
                this.dateTo,
                this.excludeCategoryIds,
                this.groupBy,
            ).then((responseData) => {
                this.incomeConsumptionByMonth = responseData;
            });
        }

        get categories() {
            return this.$store.state.categories.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        data() {
            const now = new Date();
            now.setDate(now.getDate() - 365);
            return {
                dateFromMenu: false,
                dateToMenu: false,
                dateFrom: now.toISOString().substr(0, 10),
                dateTo: new Date().toISOString().substr(0, 10),
                groupBy: 'MONTH',
                incomeConsumptionByMonth: {},
                excludeCategoryIds: [],
                searchCategoryValue: "",
            };
        }

    }
</script>

