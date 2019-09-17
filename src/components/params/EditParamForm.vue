<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card :raised="true">
                <v-card-title>
                    Параметр = {{paramKeys}}
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
                                        item-value="key"
                                        item-text="value"
                                        :return-object="false"
                                        label="Группа"
                                ></v-select>
                            </v-col>

                            <v-col cols="6">
                                <v-select
                                        :items="paramKeys"
                                        v-model="appParam.keyName"
                                        item-value="key"
                                        item-text="value"
                                        :return-object="false"
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
                                <select-date label="Значение даты" :date.sync="appParam.dateValue"/>
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import AppParamService from '@/services/AppParamService';
import SelectDate from '@/components/common/SelectDate';


@Component({components: {SelectDate}})
export default class EditParamForm extends Vue {

    get boolValues() {
        return [true, false];
    }

    get paramGroups() {
        return this.$store.state.staticDictionaries.paramGroups;
    }

    get paramKeys() {
        return this.$store.state.staticDictionaries.paramKeys;
    }
    @Prop({default: {}})
    public appParam: any;

    public editParam() {
        AppParamService.save(this.appParam)
            .then((response: any) => {
                    alert('Параметр успешно обновлен: ' + response.id);
                },
            );
    }
}
</script>
