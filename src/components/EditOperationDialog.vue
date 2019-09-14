<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <CreateOperation formMode="EDIT" :operation="operation" v-if="!loading"
                             @successfull="showDialog=false"/>
            <span v-else>Идет загрузка...</span>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">

    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import CreateOperation from "@/components/CreateOperation.vue";
    import OperationService from "@/services/OperationService";

    @Component({
        components: {CreateOperation}
    })
    export default class EditOperationDialog extends Vue {

        @Prop()
        operationId: string;

        @Prop()
        visible: string;

        get showDialog() {
            return this.visible;
        }

        set showDialog(value) {
            if (!value) {
                this.$emit("close");
            }
        }

        @Watch("operationId")
        operationIdChanged(value: string, oldValue: string) {
            this.loading = true;
            OperationService.get(value)
                .then((data) => {
                        this.loading = false;
                        this.operation = data;
                    }
                )
        }

        data() {
            return {
                loading: false,
                operation: {}
            };
        }
    }
</script>
