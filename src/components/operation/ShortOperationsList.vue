<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-card :color="cardColor">
                <v-card-title>{{title}}</v-card-title>
                <v-simple-table :dense="false">
                    <thead>
                    <tr>
                        <th class="text-left">Дата</th>
                        <th class="text-left">Счет</th>
                        <th class="text-left">Категория</th>
                        <th class="text-left">Список</th>
                        <th class="text-left">Сумма</th>
                        <th class="text-left"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in operations" :key="item.id" :class="rowClass(item)">
                        <td>{{ item.operationDate | dateFormatter }}</td>
                        <td>{{ item.account.name }}</td>
                        <td>{{ item.category.name }}</td>
                        <td>{{ shoppingListFormatter(item.shoppingList)|truncateString }}</td>
                        <td>{{getCostSign(item)}}{{ item.cost |moneyFormat}}</td>
                        <td style="white-space: nowrap; width: 1%">
                            <v-btn class="mx-2" icon color="primary" @click.stop="editOperation(item.id)">
                                <v-icon>mdi-file-document-edit</v-icon>
                            </v-btn>

                            <v-btn class="mx-2" icon color="primary" @click.stop="divideOperation(item.id)">
                                <v-icon>mdi-call-split</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-col>
        <EditOperationDialog :operationId="operationId"
                             :visible="showEditDialog"
                             @close="showEditDialog=false"/>

        <DivideOperationDialog :parentOperationId="operationId"
                               :visible="showDivideDialog"
                               @close="showDivideDialog=false"/>
    </v-row>
</template>

<script lang="ts">
import moment from 'moment';
import {Component, Prop, Vue} from 'vue-property-decorator';
import OperationUtils from '@/utils/OperationUtils';
import EditOperationDialog from '@/components/operation/EditOperationDialog.vue';
import DivideOperationDialog from '@/components/operation/DivideOperationDialog.vue';

@Component({
    components: {EditOperationDialog, DivideOperationDialog},
    methods: {
        getCostSign(item) {
            return OperationUtils.getCostSign(item);
        }
    },
})
export default class ShortOperationsList extends Vue {
    @Prop({
        default() {
            return [];
        },
    })
    public operations!: object[];

    @Prop({default: 'Операции'})
    public title!: string;

    @Prop({default: 'white'})
    public cardColor!: string;

    @Prop({default: false})
    public selectPastOperations!: string;

    public operationId = null;
    public showEditDialog = false;
    public showDivideDialog = false;

    public divideOperation(selectOperationId: any) {
        this.operationId = selectOperationId;
        this.showDivideDialog = true;
    }

    public editOperation(selectOperationId: any) {
        this.operationId = selectOperationId;
        this.showEditDialog = true;
    }

    // todo Копипаста из LastOpeartions
    public shoppingListFormatter(shoppingList: any) {
        if (!shoppingList) {
            return '';
        }
        return shoppingList.map((val: any) => (val.name)).toString();
    }

    public rowClass(item: any) {
        if (moment(item.operationDate).isBefore(moment(new Date())) && this.selectPastOperations){
            return "pastOperation"
        }
        if (moment(item.operationDate).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
            return 'nowOperation';
        }
    }

}
</script>

<style>
    .nowOperation {
        background-color: aliceblue;
    }

    .pastOperation {
        background-color: #ffa5af;
    }
</style>
