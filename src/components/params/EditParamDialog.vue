<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <EditParamForm :appParam="appParam" v-if="!loading"/>
            <span v-else>Идет загрузка...</span>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import EditParamForm from '@/components/params/EditParamForm.vue';
import AppParamService from '@/services/AppParamService';

@Component({
    components: {EditParamForm},
})
export default class EditParamDialog extends Vue {

    get showDialog() {
        return this.visible;
    }

    set showDialog(value) {
        if (!value) {
            this.$emit('close');
        }
    }

    @Prop()
    public appParamId: string | undefined;

    @Prop()
    public visible!: string;

    public loading = false;
    public appParam: any = {};

    @Watch('appParamId')
    public appParamIdChanged(value: string, oldValue: string) {
        this.loading = true;
        AppParamService.get(value)
            .then((data) => {
                    this.loading = false;
                    this.appParam = data;
                },
            );
    }
}
</script>
