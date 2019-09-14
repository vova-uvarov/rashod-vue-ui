<template>
    <v-container>
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
                                v-model="operationFilter.dateFrom"
                                label="Дата C"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="operationFilter.dateFrom"
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
                                v-model="operationFilter.dateTo"
                                label="Дата По"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="operationFilter.dateTo"
                                   @input="dateToMenu = false"></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="categories"
                        v-model="operationFilter.categoryIds"
                        :clearable="true"
                        multiple
                        :search-input.sync="searchCategoryValue"
                        @change="searchCategoryValue = ''"
                        label="Категория"
                ></v-combobox>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="accounts"
                        v-model="operationFilter.accountIds"
                        :clearable="true"
                        multiple
                        label="Счет"
                        :search-input.sync="searchAccountValue"
                        @change="searchAccountValue = ''"
                ></v-combobox>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3">
                <v-text-field
                        type="number"
                        label="Сумма С"
                        v-model="operationFilter.costFrom"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="number"
                        label="Сумма По"
                        v-model="operationFilter.costTo"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        v-model="operationFilter.place"
                        :items="places"
                        label="Место"
                ></v-combobox>
            </v-col>

            <v-col cols="3">
                <v-select
                        :items="operationTypes"
                        v-model="operationFilter.operationTypes"
                        clearable
                        multiple
                        label="Тип операции"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Комментарий"
                        v-model="operationFilter.comment"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <SelectShoppingItems
                        :selectedItems.sync="operationFilter.shoppingList"
                        :items="shoppingItems"/>
            </v-col>
            <v-col cols="3">
                <v-switch
                        v-model="operationFilter.isPlan"
                        label="План?"
                ></v-switch>
            </v-col>
            <v-col cols="3">
                <v-select
                        :items="countsPerPage"
                        v-model="operationFilter.size"
                        label="Отображать на странице"
                ></v-select>
            </v-col>


        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn color="success" :block="true" v-on:click="applyFilter">Применить фильтр
                </v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import SelectShoppingItems from "@/components/SelectShoppingItems.vue";

    @Component({
        components: {SelectShoppingItems},
        computed: {
            places: {
                get() {
                    return this.$store.state.places;
                }
            }
        }
    })
    export default class OperationsFilter extends Vue {

        get shoppingItems() {
            return this.$store.state.shoppingItemNames;
        }

        get countsPerPage() {
            return [5, 10, 20, 50, 100];
        }

        get accounts() {
            return this.$store.state.accounts.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        get operationTypes() {
            //todo сделать справочником в БД по хорошему
            return this.$store.state.operationTypes.map((val) => {
                if (val === "CONSUMPTION") {
                    return {
                        text: "Расход",
                        value: val
                    };
                }
                if (val === "INCOME") {
                    return {
                        text: "Доход",
                        value: val
                    };
                }

                if (val === "TRANSFER") {
                    return {
                        text: "Перевод",
                        value: val
                    };
                }
            });
        }

        get categories() {
            return this.$store.state.categories.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        applyFilter() {
            this.$store.commit("updateOperationsFilter", this.operationFilter);
            this.$store.dispatch("reloadOperations");
        }

        data() {
            let now = new Date();
            now.setDate(now.getDate() - 30);
            let dateFrom = now.toISOString().substr(0, 10);
            return {
                operationFilter: JSON.parse(JSON.stringify(this.$store.state.operationsView.filter)),
                dateFromMenu: false,
                dateToMenu: false,
                searchCategoryValue: "",
                searchAccountValue: "",
            };
        }

    }
</script>
