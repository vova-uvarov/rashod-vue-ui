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
                                        v-model="account.name"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                        label="Описание"
                                        v-model="account.description"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col cols="6">

                                <v-select
                                        :items="accountTypes"
                                        v-model="account.accountType"
                                        label="Тип счета"
                                ></v-select>

                            </v-col>

                            <v-col cols="6">
                                <v-select
                                        :items="currencies"
                                        label="Валюта счета"
                                        v-model="account.currency"
                                ></v-select>

                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col cols="6">
                                <v-select
                                        :items="accountStatuses"
                                        label="Статус"
                                        v-model="account.status"
                                ></v-select>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                        label="Цель счета"
                                        v-model="account.targetCost"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col cols="4">
                                <v-text-field
                                        label="Цвет"
                                        v-model="account.color"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="4">
                                <v-switch
                                        label="Округлять?"
                                        v-model="account.round"
                                ></v-switch>
                            </v-col>

                            <v-col cols="4">
                                <v-switch
                                        label="Учитывать в баласе?"
                                        v-model="account.balance"
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import SelectShoppingItems from '@/components/operation/SelectShoppingItems.vue';
import AccountService from '@/services/AccountService';

// todo понять как нормально инициализировать значение для параметра
function defaultAccount() {
    return {
        name: '',
        description: '',
        accountType: 'SIMPLE',
        targetCost: 0,
        color: 'red',
        round: false,
        isBalance: true,
        status: 'ACTIVE',
        currency: 'RUB',
    };

}

@Component({
    components: {SelectShoppingItems},
})
export default class AccountForm extends Vue {

    @Prop({default: 'CREATE'})
    public formMode!: string;

    @Prop({default: defaultAccount})
    public account: any;

    public storeAccount() {
        AccountService.create(this.account)
            .then((response: any) => {
                    this.account = defaultAccount();

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
            return 'Обновить - ' + this.account.name;
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
