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
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in operations" :key="item.name">
                    <td>{{ item.date }}</td>
                    <td>{{ item.account }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.sum }}</td>
                    <td>{{ item.shoppingList }}</td>
                    <td>{{ item.place }}</td>
                    <td>{{ item.comment }}</td>
                    <td>{{ item.author }}</td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script lang="ts">
    export default {
        data() {
            return {
                operations: [
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    },
                    {
                        date: '2018-01-01',
                        account: 'Наличные',
                        category: 'Продукты',
                        sum: 1200,
                        shoppingList: 'Молоко, яблоки, сосиски',
                        place: 'Пятерочка',
                        comment: 'На ДР к Диме',
                        author: 'Вова'
                    }

                ],
            }
        },
    }
</script>
