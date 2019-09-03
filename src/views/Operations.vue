<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">Дата</th>
                    <th class="text-left">Счет</th>
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
                    <td>{{ item.operationDate | dateFormatter }}</td>
                    <td>{{ item.account.name }}</td>
                    <td>{{ item.category.name }}</td>
                    <td>{{ item.cost |moneyFormat}}</td>
                    <td>{{ shoppingListFormatter(item.shoppingList)|truncateString }}</td>
                    <td>{{ item.place }}</td>
                    <td>{{ item.comment }}</td>
                    <td>{{ item.author }}</td>
                    <td>{{ item.plan }}</td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class AccountList extends Vue {
        created() {
            // `this` указывает на экземпляр vm
            this.$store.dispatch("loadOperations");
        }

        shoppingListFormatter(shoppingList){
            if (!shoppingList){
                return '';
            }
            return shoppingList.map(val => (val.name)).toString();
        }
        get operations() {
            return this.$store.state.operations;
        }

    }
</script>
