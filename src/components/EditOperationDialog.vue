<template>
    <v-row justify="center">

        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <CreateOperation formMode="EDIT" :operation="operation" v-if="!loading"/>
            <span v-else>Идет загрузка...</span>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">

    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import CreateOperation from "@/components/CreateOperation.vue";
    import axios from "axios";

    @Component({
        components: {CreateOperation}
    })
    export default class EditOperationDialog extends Vue {

        @Prop()
        operationId: string;

        @Prop()
        visible: string;

        get showDialog(){
            return this.visible;
        }

        set showDialog(value){
            if (!value) {
                this.$emit("close");
            }
        }

        @Watch("operationId")
        operationIdChanged(value: string, oldValue: string) {
            this.loading = true;
            axios
                .get("http://localhost:8092/api/operations/" + value)
                .then((response) => {
                        this.loading = false;
                        this.operation = response.data;
                        this.operation.operationDate=new Date(this.operation.operationDate).toISOString().substr(0, 10)
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
