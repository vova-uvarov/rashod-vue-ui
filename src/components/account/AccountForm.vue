<template>
    <v-row justify="center" align="center">
        <v-col cols="12">
            <v-card :raised="true">
                <v-card-title>
                    <v-col> {{cardTitle}}</v-col>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="6">
                                <v-text-field
                                        label="Название"
                                        v-model="accountInner.name"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                        label="Описание"
                                        v-model="accountInner.description"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col cols="6">

                                <v-select
                                        :items="accountTypes"
                                        v-model="accountInner.accountType"
                                        label="Тип счета"
                                ></v-select>

                            </v-col>

                            <v-col cols="6">
                                <v-select
                                        :items="currencies"
                                        label="Валюта счета"
                                        v-model="accountInner.currency"
                                ></v-select>

                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col cols="6">
                                <v-select
                                        :items="accountStatuses"
                                        label="Статус"
                                        v-model="accountInner.status"
                                ></v-select>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                        label="Цель счета"
                                        v-model="accountInner.targetCost"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col cols="4">
                                <v-text-field
                                        label="Цвет"
                                        v-model="accountInner.color"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="4">
                                <v-switch
                                        label="Округлять?"
                                        v-model="accountInner.round"
                                ></v-switch>
                            </v-col>

                            <v-col cols="4">
                                <v-switch
                                        label="Учитывать в баласе?"
                                        v-model="accountInner.balance"
                                ></v-switch>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col offset="6" cols="6">
                                <v-btn color="success" :block="true" v-on:click="storeAccount">
                                    <span v-if="formMode==='CREATE'">Создать Счет</span>
                                    <span v-else="formMode==='EDIT'">Обновить Счет</span>
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
import SelectShoppingItems from '@/components/operation/SelectShoppingItems.vue';
import AccountService from '@/services/AccountService';

@Component({
    components: {SelectShoppingItems},
})
export default class AccountForm extends Vue {

    @Prop({default: 'CREATE'})
    public formMode!: string;

    @PropSync('account')
    public accountInner: any;

    public storeAccount() {
        AccountService.create(this.accountInner)
            .then((response: any) => {
                    alert('Счет успешно создан: ' + response.id);
                    this.$store.dispatch('loadAccounts');
                    this.$emit('successfull');
                },
            );
    }

    get cardTitle() {
        if (this.formMode === 'CREATE') {
            return 'Создать Счет ';
        }
        if (this.formMode === 'EDIT') {
            return 'Обновить - ' + this.accountInner.name;
        }
    }

    get accountTypes() {
        return this.$store.state.accountTypes;
    }

    get currencies() {
        return this.$store.state.currencies;
    }

    get accountStatuses() {
        return this.$store.state.accountStatuses;
    }
}
</script>
