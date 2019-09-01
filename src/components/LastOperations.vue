<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-card>
                <v-card-title>{{title}}</v-card-title>
                <v-simple-table>
                    <thead>
                    <tr>
                        <th class="text-left">Дата</th>
                        <th class="text-left">Категория</th>
                        <th class="text-left">Список</th>
                        <th class="text-left">Сумма</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in operations" :key="item.id">
                        <td>{{ item.insTime | dateFormatter}}</td>
                        <td>{{ item.category.name }}</td>
                        <td>{{ item.shoppingList }}</td>
                        <td>{{ item.cost }}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class AccountList extends Vue {
        @Prop({default: []})
        operations: Array<Object>;

        @Prop({default: "Операции"})
        title: string;
    }
</script>
