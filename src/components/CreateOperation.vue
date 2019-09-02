<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card>
                <v-card-title>Создание операции</v-card-title>

                <v-row>
                    <v-col cols="12">
                        <v-radio-group v-model="radioGroup" :column="false">
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
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-select
                                :items="categories"
                                label="Категория"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="Список покупок"
                                placeholder="Список покупок"
                                outlined
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-text-field
                                type="number"
                                label="Сумма"
                                placeholder="Сумма"
                                outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="Место"
                                placeholder="Место"
                                outlined
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-select
                                :items="accounts"
                                label="Со счета"
                        ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="Комментарий"
                                placeholder="Комментарий"
                                outlined
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
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
                            <v-date-picker v-model="date" scrollable>
                                <div class="flex-grow-1"></div>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                                label="Теги"
                                placeholder="Теги"
                                outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-switch
                                v-model="operation.isPlan"
                                label="План?"
                        ></v-switch>
                    </v-col>

                    <v-col cols="6">
                        <v-select
                                :items="repeatCounts"
                                label="Количество повторений"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class CreateOperation extends Vue {
        get categories() {
            return ["Продукты", "Авто"];
        }

        get accounts() {
            return ["Наличные", "Тинькофф"];
        }

        get repeatCounts() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }

        data() {
            return {
                category: 'Наличные',
                operation: {
                    date: new Date().toISOString().substr(0, 10),
                    isPlan: false
                },
                modal: false,

            };
        }

        // data: () => ({
        //     date: new Date().toISOString().substr(0, 10),
        //     menu: false,
        //     modal: false,
        //     menu2: false,
        // })
    }
</script>
