<template>
    <div class="home">
        <v-row>
            <v-col cols="6">
                <CreateOperationFrom/>
            </v-col>
            <v-col cols="6">
                <ShortOperationsList title="Расходы"
                                card-color="green"
                                :operations="lastConsumptionOperations"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <ShortOperationsList title="Доходы/Переводы"
                                card-color="yellow"
                                :operations="lastTransferAndIncomeOperations"/>
            </v-col>
            <v-col cols="6">
                <ShortOperationsList title="Планируемые"
                                card-color="white"
                                :operations="lastPlansOperations"/>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CreateOperationFrom from '@/components/operation/CreateOperationForm.vue';
import ShortOperationsList from '@/components/operation/ShortOperationsList.vue';
import OperationService from '@/services/OperationService';

@Component({
    components: {
        CreateOperationFrom,
        ShortOperationsList,
    },
})
export default class Main extends Vue {

    public lastConsumptionOperations = [];
    public lastTransferAndIncomeOperations = [];
    public lastPlansOperations = [];
    public mounted() {
        this.loadData();
        this.$root.$on('operationChanged', () => {
            this.loadData();
        });

        this.$root.$on('operationDeleted', () => {
            this.loadData();
        });
    }

    private loadData() {
        OperationService.search({
            operationTypes: ['CONSUMPTION'],
            isPlan: false,
        }).then((data: any) => {
            this.lastConsumptionOperations = data.content;
        });

        OperationService.search({
            operationTypes: ['INCOME', 'TRANSFER'],
            isPlan: false,
        }).then((data: any) => {
            this.lastTransferAndIncomeOperations = data.content;
        });

        OperationService.search({
            isPlan: true,
            sort: 'operationDate',
        }).then((data: any) => {
            this.lastPlansOperations = data.content;
        });
    }
}
</script>
