<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <AccountForm formMode="CREATE"
                         :account="account"
                         v-if="!loading"
                         @successfull="successfull"/>
            <span v-else>Идет загрузка...</span>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import AccountForm from '@/components/account/AccountForm.vue';

@Component({
    components: {AccountForm},
})
export default class CreateAccountDialog extends Vue {

    @Prop()
    public visible!: boolean;

    get showDialog() {
        return this.visible;
    }

    set showDialog(value) {
        if (!value) {
            this.$emit("close");
        }
    }

    successfull() {
        this.showDialog = false;
        this.account = this.initAccount();
    }

    public loading = false;
    public account = this.initAccount();

    private initAccount() {
        return {
            name: "",
            description: "",
            accountType: "SIMPLE",
            targetCost: 0,
            color: "red",
            round: false,
            isBalance: true,
            status: "ACTIVE",
            currency: "RUB"
        };
    }
}
</script>
