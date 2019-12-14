<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <ShortOperationsList :title="'Операции:'+dateFrom"
                                 :operations="operations"
            />
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import ShortOperationsList from '@/components/operation/ShortOperationsList.vue';
import OperationService from '@/services/OperationService';

@Component({
    components: {ShortOperationsList},
})
export default class ShortOperationsListDialog extends Vue {

    get showDialog() {
        return this.visible;
    }

    set showDialog(value) {
        if (!value) {
            this.$emit('close');
        }
    }

    @Prop()
    public dateFrom!: string;

    @Prop()
    public dateTo!: string;

    @Prop()
    public visible!: string;

    public loading = false;
    public operations: any = {};

    @Watch('dateFrom')
    public operationIdChanged(value: string, oldValue: string) {
        this.loading = true;
        OperationService.search({
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            operationTypes: ['CONSUMPTION', 'TRANSFER']
        })
            .then((data: any) => {
                    console.log (JSON.stringify(data.content));
                this.operations = data.content;
                }
            );
    }
}
</script>
