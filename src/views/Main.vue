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
    import CreateOperation from "../components/CreateOperation.vue"; // @ is an alias to /src
    import LastOperations from "../components/LastOperations.vue"; // @ is an alias to /src
    import axios from 'axios';

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
            axios
                .get('http://localhost:8092/api/operations/search', {
                    params: {
                        operationTypes: 'CONSUMPTION',
                        isPlan: false,
                    },
                })
                .then((response) => (this.lastConsumptionOperations = response.data.content));

            axios
                .get('http://localhost:8092/api/operations/search', {
                    params: {
                        operationTypes: 'INCOME,TRANSFER',
                        isPlan: false,
                    },
                })
                .then((response) => (this.lastTransferAndIncomeOperations = response.data.content));

            axios
                .get('http://localhost:8092/api/operations/search', {
                    params: {
                        operationTypes: 'INCOME,TRANSFER,CONSUMPTION',
                        isPlan: true,
                    },
                })
                .then((response) => (this.lastPlansOperations = response.data.content));
        }

        mounted(){
            this.$root.$on('operationCreated', () => {
                this.loadData();
            })

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
