<!--todo из view сделать компонент-->
<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-simple-table>
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
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in operations" :key="item.name">
                    <td>
                        <v-btn class="mx-2" fab dark small color="primary"  @click="deleteOperation(item.id)">
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
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import axios from "axios";

    @Component
    export default class OperationsList extends Vue {

        deleteOperation(id) {
            if (confirm("Вы действительно хотите удалить операцию?")) {
                axios
                    .delete("http://localhost:8092/api/operations/" + id)
                    .then((response) => {
                            this.$root.$emit('operationDeleted');
                            this.$store.dispatch("reloadOperations");
                        }
                    );
            }
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

    }
</script>
