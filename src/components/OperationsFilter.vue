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
                <v-select
                        :items="categories"
                        v-model="operationFilter.category.id"
                        label="Категория"
                ></v-select>
            </v-col>

            <v-col cols="3">
                <v-select
                        :items="accounts"
                        v-model="operationFilter.account.id"
                        label="Счет"
                ></v-select>
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
                <v-text-field
                        type="text"
                        label="Место"
                        v-model="operationFilter.place"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-select
                        :items="accounts"
                        v-model="operationFilter.account.id"
                        label="Тип операции"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Автор"
                        v-model="operationFilter.author"
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Комментарий"
                        v-model="operationFilter.comment"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Список покупок"
                        v-model="operationFilter.shoppingList"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Тэги"
                        v-model="operationFilter.tags"
                ></v-text-field>
            </v-col>
        </v-row>

    </v-container>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class OperationsFilter extends Vue {
        //todo копипаста
        created() {
            // `this` указывает на экземпляр vm
            this.$store.dispatch("loadAccounts");
            this.$store.dispatch("loadCategories");
        }

        get accounts() {
            return this.$store.state.accounts.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        get categories() {
            return this.$store.state.categories.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        data() {
            let now = new Date();
            now.setDate(now.getDate() - 30);
            let dateFrom = now.toISOString().substr(0, 10);
            return {
                operationFilter: {
                    dateFrom: dateFrom,
                    dateTo: new Date().toISOString().substr(0, 10),
                    category: {},
                    account: {},
                    place: "",
                    costFrom: null,
                    costTo: null,
                },
                dateFromMenu: false,
                dateToMenu: false,
            };
        }

    }
</script>
