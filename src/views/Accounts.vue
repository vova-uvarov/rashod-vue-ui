<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Дата создания</th>
                    <th class="text-left">Название</th>
                    <th class="text-left">Описание</th>
                    <th class="text-left">Тип</th>
                    <th class="text-left">Цель счета</th>
                    <th class="text-left">Округлять?</th>
                    <th class="text-left">Статус</th>
                    <th class="text-left">Валюта</th>
                    <th class="text-left">Учитывать в балансе?</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in accounts" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.insTime | dateFormatter}}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.accountType }}</td>
                    <td>{{ item.targetCost }}</td>
                    <td>{{ item.round }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.currency }}</td>
                    <td>{{ item.balance }}</td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Accounts extends Vue{
        created() {
            // `this` указывает на экземпляр vm
            this.$store.dispatch("loadAccounts");
        }
        get accounts() {
            return this.$store.state.accountsView.accounts;
        }
    }
</script>
