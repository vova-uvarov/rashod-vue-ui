<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card :raised="true" :color="cardColor">
                <v-card-title>
                    <v-col> {{cardTitle}}</v-col>
                    <v-radio-group v-model="operation.operationType" :column="false">
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
                            <v-col cols="6">
                                <v-select
                                        :items="categories"
                                        v-model="operation.category.id"
                                        label="Категория"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        type="number"
                                        label="Сумма"
                                        v-model="operation.cost"
                                ></v-text-field>
                            </v-col>

                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-select
                                        :items="accounts"
                                        v-model="operation.account.id"
                                        label="Со счета"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-if="operation.operationType==='TRANSFER'"
                                          :items="accounts"
                                          v-model="operation.accountToTransfer.id"
                                          label="На счет"
                                ></v-select>

                                <SelectShoppingItems v-if="operation.operationType!='TRANSFER' && showShoppingItem"
                                                     :selectedItems.sync="operation.shoppingList"
                                                     :items="shoppingItems"/>

                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        label="Место"
                                        v-model="operation.place"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field label="Теги" disabled
                                ></v-text-field>
                            </v-col>

                        </v-row>


                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        v-model="operation.comment"
                                        label="Комментарий"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-menu
                                        v-model="operationDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="operation.operationDate"
                                                label="Дата"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="operation.operationDate"
                                                   @input="operationDateMenu = false"></v-date-picker>
                                </v-menu>
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
                                        v-model="operation.plan"
                                        label="План?"
                                ></v-switch>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col offset="6" cols="6">
                                <v-btn color="success" :block="true" v-on:click="createOperation">
                                    <span v-if="formMode==='CREATE'">Создать Операцию</span>
                                    <span v-else-if="formMOde==='EDIT'">Обновить Операцию</span>
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
    import {Component, Prop, Vue} from "vue-property-decorator";
    import OperationService from "@/services/OperationService";
    import SelectShoppingItems from "@/components/SelectShoppingItems.vue";

    function defaultOperation() {
        return {
            operationDate: new Date().toISOString().substr(0, 10),
            comment: "",
            plan: false,
            place: "",
            category: {id: 2},
            account: {id: 2},
            accountToTransfer: {},
            cost: 0,
            shoppingList: undefined,
            operationType: "CONSUMPTION"
        };
    }

    @Component({
        components: {SelectShoppingItems}
    })
    export default class CreateOperation extends Vue {

        @Prop({default: "CREATE"})
        formMode: string;

        @Prop({default: defaultOperation})
        operation: any;

        get shoppingItems() {
            return this.$store.state.shoppingItemNames;
        }

        createOperation() {
            OperationService.create(this.operation, this.countRepeat)
                .then((response) => {
                        this.operation = defaultOperation();
                        // todo hack для перерисовки внутреннего компонента. Разобраться и переделать
                        this.showShoppingItem = false;
                        this.$nextTick().then(() => (this.showShoppingItem = true));
                        alert("Операция успешно создана: " + response.id);
                        this.$store.dispatch("loadAccounts");
                        this.$store.dispatch("loadCategories");
                        this.$root.$emit("operationCreated");
                    }
                );
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
            return this.$store.state.categories.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        get accounts() {
            return this.$store.state.accounts.map(val => ({
                text: val.name,
                value: val.id
            }));
        }

        get repeatCounts() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }

        get cardName() {
            if (this.operation.operationType == "CONSUMPTION") {
                return "Расход";
            }

            if (this.operation.operationType == "TRANSFER") {
                return "Перевод";
            }
            return "Доход";
        }

        get cardColor() {
            console.log("operation=" + this.operation.operationType);
            if (this.operation.operationType == "CONSUMPTION") {
                return "#FFF8F8";
            }

            if (this.operation.operationType == "TRANSFER") {
                return "#FBFFD8";
            }
            return "#F6FFEA";
        }

        data() {
            return {
                countRepeat: 1,
                operationDateMenu: false,
                showShoppingItem: true,
            };
        }

    }
</script>
