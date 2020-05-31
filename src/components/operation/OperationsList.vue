<template>
    <v-row justify="center" align="start">
        <v-col cols="6" offset="3" v-if="loading">
            <v-progress-circular

                    :indeterminate="true"
                    :rotate="0"
                    :size="32"
                    :value="0"
                    :width="4"
                    color="light-blue"
            />
            Идет загрузка данных...
        </v-col>
        <v-col cols="12">
            <v-simple-table :dense="true">
                <thead>
                <tr>
                    <th class="text-left"></th>
                    <th class="text-left">Дата</th>
                    <th class="text-left">Счет</th>
                    <th class="text-left">На Счет</th>
                    <th class="text-left">Категория</th>
                    <th class="text-left">Сумма</th>
                    <th class="text-left">Список покупок</th>
                    <th class="text-left">Место</th>
                    <th class="text-left">Комментарий</th>
                    <th class="text-left">Автор</th>
                    <th class="text-left">План</th>
                    <th class="text-left">
                        <v-btn class="mx-2" fab dark x-small color="primary" @click="createOperation()">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in operations" :key="item.name" :class="rowStyle(item,index)">
                    <td>
                        <v-btn class="mx-2" fab dark x-small color="primary" @click="deleteOperation(item.id)">
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </td>
                    <td>{{ item.operationDate | dateFormatter }}</td>
                    <td>{{ item.account.name }}</td>
                    <td>{{ item.accountToTransfer?item.accountToTransfer.name:'' }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>{{getCostSign(item)}}{{ item.cost |moneyFormat}}<span v-if="item.cost!==item.inputCost">({{getCostSign(item)}}{{ item.inputCost |moneyFormat}})</span>
                    </td>
                    <td>{{ shoppingListFormatter(item.shoppingList)|truncateString }}</td>
                    <td>{{ item.place }}</td>
                    <td>{{ item.comment }}</td>
                    <td>{{ item.creator.login }}</td>
                    <td>
                        <v-switch
                                v-model="item.plan"
                                label=""
                                :disabled="true"
                        ></v-switch>
                    </td>

                    <td style="white-space: nowrap; width: 1%">
                        <v-btn x-small class="mx-2" fab dark color="primary">
                            <v-icon @click="editOperation(item.id)">mdi-file-document-edit</v-icon>
                        </v-btn>


                        <v-btn class="mx-2" fab dark x-small color="primary" @click.stop="divideOperation(item.id)">
                            <v-icon>mdi-call-split</v-icon>
                        </v-btn>
                    </td>
                </tr>

                </tbody>
            </v-simple-table>
        </v-col>
        <CreateOperationDialog :visible="showCreateDialog" @close="showCreateDialog=false"/>
        <EditOperationDialog :operationId="operationId" :visible="showEditDialog" @close="showEditDialog=false"/>
        <DivideOperationDialog :parentOperationId="operationId"
                               :visible="showDivideDialog"
                               @close="showDivideDialog=false"/>
    </v-row>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import CreateOperationDialog from '@/components/operation/CreateOperationDialog.vue';
    import EditOperationDialog from '@/components/operation/EditOperationDialog.vue';
    import OperationService from '@/services/OperationService';
    import OperationUtils from '@/utils/OperationUtils';
    import DivideOperationDialog from '@/components/operation/DivideOperationDialog.vue';

    @Component({
        components: {EditOperationDialog, DivideOperationDialog, CreateOperationDialog},
        methods: {
            getCostSign(item: any) {
                return OperationUtils.getCostSign(item);
            },
            rowStyle(item: any, index: any) {
                let mainClass = '';
                if (item.operationType === 'CONSUMPTION') {
                    mainClass = 'consumptionRow';
                }

                if (item.operationType === 'TRANSFER') {
                    mainClass = 'transfer';
                }

                if (item.operationType === 'INCOME') {
                    mainClass = 'income';
                }

                if (index % 2 === 0) {
                    return mainClass + ' odd';
                } else {
                    return mainClass + ' even';
                }
            }
        }
    })
    export default class OperationsList extends Vue {

        @Prop({default: []})
        public operations!: object[];

        @Prop({default: false})
        public loading!: boolean;

        public operationId = null;
        public showEditDialog = false;
        public showDivideDialog = false;
        public showCreateDialog = false;

        public deleteOperation(id: string) {
            if (confirm('Вы действительно хотите удалить операцию?')) {
                OperationService.delete(id)
                    .then((response) => {
                            this.$root.$emit('operationChanged');
                        }
                    );
            }
        }

        public divideOperation(selectOperationId: any) {
            this.operationId = selectOperationId;
            this.showDivideDialog = true;
        }

        public createOperation() {
            this.showCreateDialog = true;
        }

        public editOperation(selectOperationId: any) {
            this.operationId = selectOperationId;
            this.showEditDialog = true;
        }

        public shoppingListFormatter(shoppingList: any[]) {
            if (!shoppingList) {
                return '';
            }
            return shoppingList.map((val) => (val.name)).toString();
        }
    }
</script>

<style>
    .consumptionRow.odd {
        background-color: #ffd0d9;
    }

    .consumptionRow.even {
        background-color: #ffe8ed;
    }

    .income.odd {
        background-color: #c4ffbe;
    }

    .income.even {
        background-color: #deffd2;
    }

    .transfer.odd {
        background-color: #fdff95;
    }

    .transfer.even {
        background-color: #f6ffcf;
    }


</style>
