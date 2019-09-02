<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card :raised="true" :color="cardColor">
                <v-card-title>
                    <v-col>Создать</v-col>
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
                                        v-model="operation.category"
                                        label="Категория"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        label="Список покупок"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        type="number"
                                        label="Сумма"
                                        v-model="operation.cost"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                        label="Место"
                                        v-model="operation.place"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-select
                                        :items="accounts"
                                        v-model="operation.account"
                                        label="Со счета"
                                ></v-select>
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
                            <v-col cols="4">
                                <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="operation.date"
                                        persistent
                                        full-width
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="operation.date"
                                                label="Дата"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="operation.date" scrollable>
                                        <div class="flex-grow-1"></div>
                                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="4">
                                <v-switch
                                        v-model="operation.isPlan"
                                        label="План?"
                                ></v-switch>
                            </v-col>

                            <v-col cols="4">
                                {{operation.operationType}}
                                <v-select
                                        :items="repeatCounts"
                                        label="Количество повторений"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class CreateOperation extends Vue {
        get categories() {
            return [
                {text: "Продукты", value: 1},
                {text: "Авто", value: 2}
            ];
        }

        get accounts() {
            return [
                {text: "Тинькофф", value: 1},
                {text: "Наличные", value: 2}
            ];
        }

        get repeatCounts() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }

        get cardColor(){
            console.log(this.operation)
            return 'green';
        }

        data() {
            return {
                operation: {
                    date: new Date().toISOString().substr(0, 10),
                    comment: '',
                    isPlan: false,
                    place: '',
                    category: 2,
                    account: 2,
                    cost: 0,
                    operationType: 'CONSUMPTION'
                },
                modal: false,

            };
        }
    }
</script>
