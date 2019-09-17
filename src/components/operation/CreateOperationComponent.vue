<template>
    <v-row justify="center">
        <CreateOperation formMode="CREATE" :operation="operation"/>
    </v-row>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CreateOperation from "@/components/operation/CreateOperationForm.vue";

    @Component({
        components: {CreateOperation}
    })
    export default class CreateOperationComponent extends Vue {
        mounted() {
            this.$root.$on("operationChanged", () => {
                this.operation = this.defaultOperation();
            });

        }

        public operation: any = this.defaultOperation();

        private defaultOperation() {
            return {
                operationDate: new Date().toISOString().substr(0, 10),
                comment: "",
                plan: false,
                place: "",
                category: {name: "Продукты", id: 32}, // todo переделать нормально
                account: {id: 3, name: "Тинькофф"}, // todo переделать нормально это жесткий хак
                accountToTransfer: {},
                cost: 0,
                shoppingList: undefined,
                operationType: "CONSUMPTION"
            };
        }
    }
</script>
