<template>
    <div class="home">
        <v-row>
            <v-col cols="6">
                <CreateOperation/>
            </v-col>
            <v-col cols="6">
                <LastOperations title="Расходы2" :operations="lastConsumptionOperations"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <LastOperations title="Расходы" :operations="lastConsumptionOperations"/>
            </v-col>
            <v-col cols="6">
                <LastOperations title="Доходы/Переводы" :operations="lastTransferAndIncomeOperations"/>
            </v-col>
        </v-row>
        <v-row>
            Тут еще что-то будет
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CreateOperation from "../components/CreateOperation.vue"; // @ is an alias to /src
    import LastOperations from "../components/LastOperations.vue"; // @ is an alias to /src

    @Component({
        components: {
            CreateOperation,
            LastOperations,
        }
    })
    export default class Main extends Vue {
        created() {
            this.$store.dispatch("loadLastConsumptionOperations");
            this.$store.dispatch("loadLastTransferAndIncomingOperations");
        }

        get lastConsumptionOperations() {
            return this.$store.state.mainView.lastConsumptionOperations;
        }

        get lastTransferAndIncomeOperations() {
            return this.$store.state.mainView.lastTransferAndIncomeOperations;
        }
    }
</script>
