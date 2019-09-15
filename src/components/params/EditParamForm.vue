<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card :raised="true" :color="cardColor">
                <v-card-title>
                    Параметр
                </v-card-title>
                <v-card-text>
                    <v-container>

                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Название"
                                        v-model="appParam.name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-select
                                        :items="paramGroups"
                                        v-model="appParam.groupName"
                                        label="Группа"
                                ></v-select>
                            </v-col>

                            <v-col cols="6">
                                <v-select
                                        :items="paramKeys"
                                        v-model="appParam.keyName"
                                        label="Ключ"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <!--                            Date dateValue;-->
                            <v-col cols="6">
                                <v-text-field
                                        label="Строковое значение"
                                        v-model="appParam.stringValue"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                        type="number"
                                        label="Числовое значение"
                                        v-model="appParam.numberValue"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        type="number"
                                        label="Денежное значение"
                                        v-model="appParam.decimalValue"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-select
                                        :items="boolValues"
                                        v-model="appParam.b"
                                        label="Ключ"
                                        clearable
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-menu
                                        v-model="paramDateValueMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="appParam.dateValue"
                                                label="Значение даты"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="appParam.dateValue"
                                                   @input="paramDateValueMenu = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="6">
                                <v-btn color="success" :block="true" v-on:click="editParam">
                                    <span>Сохранить параметр</span>
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
    import AppParamService from "@/services/AppParamService";


    @Component
    export default class EditParamForm extends Vue {

        @Prop({default: {}})
        appParam: any;

        get boolValues() {
            return [true, false];
        }

        get paramGroups() {
            return this.$store.state.paramGroups;
        }

        get paramKeys() {
            return this.$store.state.paramKeys;
        }

        get shoppingItems() {
            return this.$store.state.shoppingItemNames;
        }

        editParam() {
            AppParamService.save(this.appParam)
                .then((response: any) => {
                        alert("Параметр успешно обновлен: " + response.id);
                    }
                );
        }

        paramDateValueMenu = false;
    }
</script>
