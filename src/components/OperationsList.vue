<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-simple-table :dense="true">
                <thead>
                <tr>
                    <th class="text-left">Действия</th>
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
                    <th class="text-left"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in operations" :key="item.name">
                    <td>
                        <v-btn class="mx-2" fab dark small color="primary" @click="deleteOperation(item.id)">
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </td>
                    <td>{{ item.operationDate | dateFormatter }}</td>
                    <td>{{ item.account.name }}</td>
                    <td>{{ item.accountToTransfer?item.accountToTransfer.name:'' }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>{{ item.cost |moneyFormat}}</td>
                    <td>{{ shoppingListFormatter(item.shoppingList)|truncateString }}</td>
                    <td>{{ item.place }}</td>
                    <td>{{ item.comment }}</td>
                    <td>{{ item.author }}</td>
                    <td>
                        <v-switch
                                v-model="item.plan"
                                label=""
                                :disabled="true"
                        ></v-switch>
                    </td>
                    <td>
                        <v-btn class="mx-2" fab dark small color="primary" @click.stop="editOperation(item.id)">
                            <v-icon>mdi-file-document-edit</v-icon>
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
        <EditOperationDialog :operationId="operationId" :visible="showEditDialog" @close="showEditDialog=false"/>
    </v-row>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import EditOperationDialog from "@/components/EditOperationDialog.vue";
    import OperationService from "@/services/OperationService";

    @Component({
        components: {EditOperationDialog}
    })
    export default class OperationsList extends Vue {

        deleteOperation(id: string) {
            if (confirm("Вы действительно хотите удалить операцию?")) {
                OperationService.delete(id)
                    .then((response) => {
                            this.$root.$emit('operationDeleted');
                            this.$store.dispatch("reloadOperations");
                        }
                    );
            }
        }

        editOperation(selectOperationId) {
            this.operationId = selectOperationId;
            this.showEditDialog = true;
        }

        shoppingListFormatter(shoppingList: Array<any>) {
            if (!shoppingList) {
                return "";
            }
            return shoppingList.map(val => (val.name)).toString();
        }

        get operations() {
            return this.$store.state.operationsView.operations;
        }

        data() {
            return {
                operationId: null,
                showEditDialog: false
            };
        }

    }
</script>
