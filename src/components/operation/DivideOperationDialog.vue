<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <ShortOperationInfoBar :operation="operation"/>
            <CreateOperation formMode="DIVIDE" :operation="operation" v-if="!loading"
                             @successfull="showDialog=false"/>
            <span v-else>Идет загрузка...</span>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">

    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import CreateOperation from "@/components/operation/CreateOperation.vue";
    import ShortOperationInfoBar from "@/components/operation/ShortOperationInfoBar.vue";
    import OperationService from "@/services/OperationService";

    @Component({
        components: {CreateOperation, ShortOperationInfoBar}
    })
    export default class DivideOperationDialog extends Vue {

        @Prop()
        parentOperationId!: string;

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

        @Watch("parentOperationId")
        operationIdChanged(value: string, oldValue: string) {
            this.loading = true;
            OperationService.get(value)
                .then((data) => {
                        this.loading = false;
                        this.operation = data;
                        this.operation.id = null;
                        this.operation.parentId = value;
                    }
                );
        }

        loading = false;
        operation: any = {};
    }
</script>
