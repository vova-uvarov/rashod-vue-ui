<template>

    <v-row justify="center">
        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <v-card>
                <v-card-title>Уравнивание счета: {{accountBalance.accountName}}</v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                    type="number"
                                    label="Актуально значение баланса"
                                    v-model="actualBalance"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-btn color="success" :block="true" v-on:click="qualization">Уравнять</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">

    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import AccountService from "@/services/AccountService";

    @Component
    export default class EqualizationAccountBalanceDialog extends Vue {

        @Prop()
        accountBalance!: any;

        @Prop()
        visible!: string;

        get showDialog() {
            return this.visible;
        }

        set showDialog(value) {
            if (!value) {
                this.$emit("close");
            }
        }

        @Watch("accountBalance")
        accountIdChanged(value: any, oldValue: any) {
            this.actualBalance = value.balance;
        }

        qualization() {
            AccountService.equalization(this.accountBalance.accountId, this.actualBalance)
                .then((data) => {
                    alert("Уравнивание прошло успешно");
                    this.$emit("close");
                    this.$root.$emit("operationCreated");
                });
        }

        account = {};
        actualBalance = 0;
    }
</script>
