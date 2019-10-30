<template>
    <v-row justify="center">
        <CreateOperation formMode="CREATE" :operation="operation()"/>
    </v-row>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import CreateOperation from "@/components/operation/CreateOperationForm.vue";

    @Component({
        components: {CreateOperation}
    })
    export default class CreateOperationComponent extends Vue {

        mounted() {
            this.$root.$on("operationChanged", () => {
                this.operationInner = this.defaultOperation();
            });

        }

        private operationInner: any = {};
        public operation(){
            return this.operationInner;
        }

        private defaultOperation() {
            return {
                operationDate: new Date().toISOString().substr(0, 10),
                comment: "",
                plan: false,
                place: "",
                category: this.getParam("CREATE_OPERATION_CATEGORY").category,
                account: this.getParam("CREATE_OPERATION_ACCOUNT").account,
                accountToTransfer: null,
                cost: 0,
                shoppingList: [],
                operationType: "CONSUMPTION"
            };
        }

        get appParams(){
            return this.$store.state.appParams;
        }

        @Watch('appParams')
        public appParamIdChanged(value: string, oldValue: string) {
            console.log("appParams changed");
            this.operationInner = this.defaultOperation();
        }

        public getParam(paramName: any) {
            let anies = this.$store.state.appParams
                .filter((el: any)=>el.groupName=='DEFAULT_VALUES')
                .filter((el: any)=>el.keyName==paramName);
            if (anies[0]==undefined){
                return {};
            }
            return anies[0];

        }
    }
</script>
