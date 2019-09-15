<template>
    <div class="home">
        <v-row>
            <v-col cols="6">
                <CreateOperation/>
            </v-col>
            <v-col cols="6">
                <LastOperations title="Расходы"
                                card-color="green"
                                :operations="lastConsumptionOperations"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <LastOperations title="Доходы/Переводы"
                                card-color="yellow"
                                :operations="lastTransferAndIncomeOperations"/>
            </v-col>
            <v-col cols="6">
                <LastOperations title="Планируемые"
                                card-color="white"
                                :operations="lastPlansOperations"/>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CreateOperation from "../components/operation/CreateOperation.vue"; // @ is an alias to /src
    import LastOperations from "../components/operation/LastOperations.vue"; // @ is an alias to /src
    import OperationService from '../services/OperationService';

    @Component({
        components: {
            CreateOperation,
            LastOperations,
        }
    })
    export default class Main extends Vue {
        created() {
            this.loadData();
        }

        private loadData() {
            OperationService.search({
                operationTypes: ['CONSUMPTION'],
                isPlan: false,
            }).then((data) => {
                this.lastConsumptionOperations = data.content
            });

            OperationService.search({
                operationTypes: ['INCOME','TRANSFER'],
                isPlan: false,
            }).then((data) => {
                this.lastTransferAndIncomeOperations = data.content
            });

            OperationService.search({
                isPlan: true,
                sort: 'operationDate'
            }).then((data) => {
                this.lastPlansOperations = data.content
            });
        }

        mounted() {
            this.$root.$on('operationCreated', () => {
                this.loadData();
            });

            this.$root.$on('operationDeleted', () => {
                this.loadData();
            })
        }

        data() {
            return {
                lastConsumptionOperations: [],
                lastTransferAndIncomeOperations: [],
                lastPlansOperations: [],
            };
        }
    }
</script>
