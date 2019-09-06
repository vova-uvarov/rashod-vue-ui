<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-card :color="cardColor">
                <v-card-title>{{title}}</v-card-title>
                <v-simple-table>
                    <thead>
                    <tr>
                        <th class="text-left">Дата</th>
                        <th class="text-left">Категория</th>
                        <th class="text-left">Список</th>
                        <th class="text-left">Сумма</th>
                        <th class="text-left"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in operations" :key="item.id">
                        <td>{{ item.operationDate | dateFormatter }}</td>
                        <td>{{ item.category.name }}</td>
                        <td>{{ shoppingListFormatter(item.shoppingList)|truncateString }}</td>
                        <td>{{ item.cost |moneyFormat}}</td>
                        <td>
                            <v-btn class="mx-2" fab dark small color="primary" @click.stop="editOperation(item.id)">
                                <v-icon>mdi-file-document-edit</v-icon>
                            </v-btn>

                            <v-btn class="mx-2" fab dark small color="primary" @click.stop="divideOperation(item.id)">
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
    import {Component, Prop, Vue} from "vue-property-decorator";
    import EditOperationDialog from "@/components/EditOperationDialog.vue";
    import DivideOperationDialog from "@/components/DivideOperationDialog.vue";

    @Component({
        components: {EditOperationDialog, DivideOperationDialog}
    })
    export default class AccountList extends Vue {
        @Prop({default: []})
        operations: Array<Object>;

        @Prop({default: "Операции"})
        title: string;

        @Prop({default: "white"})
        cardColor: string;

        divideOperation(selectOperationId) {
            this.operationId = selectOperationId;
            this.showDivideDialog = true;
        }

        editOperation(selectOperationId) {
            this.operationId = selectOperationId;
            this.showEditDialog = true;
        }


        data() {
            return {
                operationId: null,
                showEditDialog: false,
                showDivideDialog: false
            };
        }

        //todo Копипаста из LastOpeartions
        //todo Копипаста из LastOpeartions
        shoppingListFormatter(shoppingList) {
            if (!shoppingList) {
                return "";
            }
            return shoppingList.map(val => (val.name)).toString();
        }
    }
</script>
