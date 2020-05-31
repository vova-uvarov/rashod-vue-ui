<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card :raised="true" :color="cardColor">
                <v-card-title>
                    <v-col> {{cardTitle}}</v-col>
                    <v-radio-group v-model="operationInner.operationType" :column="false">
                        <v-radio
                                key="CONSUMPTION"
                                label="Расход"
                                value="CONSUMPTION"
                        ></v-radio>
                        <v-radio
                                key="INCOME"
                                label="Доход"
                                value="INCOME"
                        ></v-radio>
                        <v-radio
                                key="TRANSFER"
                                label="Перевод"
                                value="TRANSFER"
                        ></v-radio>
                    </v-radio-group>

                </v-card-title>
                <v-card-text>
                    <v-container>

                        <v-row>
                            <v-col cols="6" v-if="operationInner.operationType!=='TRANSFER'">
                                <v-combobox
                                        :items="categories"
                                        v-model="operationInner.category"
                                        item-value="id"
                                        item-text="name"
                                        label="Категория"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        type="number"
                                        label="Сумма"
                                        v-model="operationInner.cost"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6" v-if="operationInner.operationType==='TRANSFER'">
                                <v-text-field
                                        type="number"
                                        label="Сумма в валюте счета зачисления"
                                        v-model="operationInner.currencyCost"
                                ></v-text-field>
                            </v-col>

                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-combobox
                                        :items="accounts"
                                        v-model="operationInner.account"
                                        :label="getAccountTitle"
                                        item-value="id"
                                        item-text="name"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="6">
                                <v-combobox v-if="operationInner.operationType==='TRANSFER'"
                                          :items="accounts"
                                          v-model="operationInner.accountToTransfer"
                                          item-value="id"
                                          item-text="name"
                                          label="На счет"
                                ></v-combobox>

                                <SelectShoppingItems
                                        v-if="operationInner.operationType!=='TRANSFER' && showShoppingItem"
                                        :selectedItems.sync="operationInner.shoppingList"
                                        :items="shoppingItems"/>

                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-combobox
                                        v-model="operationInner.place"
                                        :items="places"
                                        label="Место"
                                ></v-combobox>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field label="Теги" disabled
                                ></v-text-field>
                            </v-col>

                        </v-row>


                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        v-model="operationInner.comment"
                                        label="Комментарий"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <select-date label="Дата" :date.sync="operationInner.operationDate"/>
                            </v-col>

                            <v-col cols="3">
                                <v-select v-if="formMode==='CREATE'"
                                          v-model="countRepeat"
                                          :items="repeatCounts"
                                          label="Количество повторений"
                                ></v-select>
                            </v-col>

                            <v-col cols="3">
                                <v-switch
                                        v-model="operationInner.plan"
                                        label="План?"
                                ></v-switch>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="6" v-if="formMode==='EDIT'">
                                <v-btn color="error" :block="true" v-on:click="deleteOperation">
                                    Удалить
                                </v-btn>
                            </v-col>
                            <v-col cols="6" v-if="formMode==='EDIT'">
                                <v-btn color="success" :block="true" v-on:click="createOperation">
                                    Обновить Операцию
                                </v-btn>
                            </v-col>
                            <v-col offset="6" cols="6" v-else>
                                <v-btn color="success" :block="true" v-on:click="createOperation">
                                    <span v-if="formMode==='CREATE'">Создать Операцию</span>
                                    <span v-else>Разбить Операцию</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, PropSync, Vue} from "vue-property-decorator";
    import OperationService from "@/services/OperationService";
    import SelectShoppingItems from "@/components/operation/SelectShoppingItems.vue";
    import SelectDate from "@/components/common/SelectDate.vue";

    @Component({
        components: {SelectShoppingItems, SelectDate}
    })
    export default class CreateOperationForm extends Vue {

        get places() {
            return this.$store.state.places;
        }

        get shoppingItems() {
            return this.$store.getters.shoppintItemNamesByOperationType(this.operationInner.operationType);
        }

        get getAccountTitle() {
            if (this.operationInner.operationType === 'INCOME') {
                return 'На счет';
            }
            return 'Со счета';
        }

        get cardTitle() {
            if (this.formMode === "CREATE") {
                return "Создать - " + this.cardName;
            }
            if (this.formMode === "EDIT") {
                return "Обновить - " + this.cardName;
            }
            if (this.formMode === "DIVIDE") {
                return "Разбить - " + this.cardName;
            }
        }

        get categories() {
            return this.$store.state.categories;
        }

        get accounts() {
            return this.$store.state.accounts;
        }

        get repeatCounts() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }

        get cardName() {
            if (this.operationInner.operationType === "CONSUMPTION") {
                return "Расход";
            }

            if (this.operationInner.operationType === "TRANSFER") {
                return "Перевод";
            }
            return "Доход";
        }

        get cardColor() {
            if (this.operationInner.operationType === "CONSUMPTION") {
                return "#FFF8F8";
            }

            if (this.operationInner.operationType === "TRANSFER") {
                return "#FBFFD8";
            }
            return "#F6FFEA";
        }

        @Prop({default: "CREATE"})
        public formMode!: string;

        @PropSync("operation") // todo посмотреть возможно propSync не нужен
        public operationInner: any;

        public countRepeat = 1;
        public showShoppingItem = true;

        public deleteOperation() {
            if (confirm("Вы действительно хотите удалить операцию?")) {
                OperationService.delete(this.operationInner.id)
                    .then((response) => {
                        alert("Операция успешно удалена: " + this.operationInner.id);
                        this.$root.$emit("operationChanged");
                        this.$emit("successfull");
                    });
            }
        }

        public createOperation() {
            OperationService.create(this.operationInner, this.countRepeat)
                .then((response: any) => {
                        alert("Операция успешно создана: " + response.id);
                        this.$store.dispatch("loadAccounts");
                        this.$store.dispatch("loadCategories");
                        this.$root.$emit("operationChanged");
                        this.$emit("successfull");
                    // todo hack для перерисовки внутреннего компонента. Разобраться и переделать
                    this.showShoppingItem = false;
                    this.$nextTick().then(() => (this.showShoppingItem = true));
                    }
                );
        }

    }
</script>
