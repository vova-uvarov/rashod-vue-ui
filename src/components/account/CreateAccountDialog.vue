<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <AccountForm formMode="CREATE" v-if="!loading"
                         @successfull="showDialog=false"/>
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
    public visible!: string;

    get showDialog() {
        return this.visible;
    }

    set showDialog(value) {
        if (!value) {
            this.$emit('close');
        }
    }

    public loading = false;
}
</script>
