<template>
    <v-simple-table>
        <thead>
        <tr>
            <th class="text-left">Дата</th>
            <th class="text-left">Категория</th>
            <th class="text-left">Сумма</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in operations" :key="item.name">
            <td>{{ item.date }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.sum }}</td>
        </tr>
        </tbody>
    </v-simple-table>
</template>
<script>
    export default {
        data () {
            return {
                operations: [
                    {
                        date: '2018-01-01',
                        category: 'Продукты',
                        sum: 1200,
                    },
                    {
                        date: '2018-01-01',
                        category: 'Продукты',
                        sum: 1201,
                    },
                    {
                        date: '2018-01-01',
                        category: 'Продукты',
                        sum: 1202,
                    },
                ],
            }
        },
    }
</script>
