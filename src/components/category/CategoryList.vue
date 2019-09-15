<template>
    <v-row justify="center" align="start">
        <v-col cols="12">
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left"></th>
                    <th class="text-left">ID</th>
                    <th class="text-left">Дата создания</th>
                    <th class="text-left">Название</th>
                    <th class="text-left">Описание</th>
                    <th class="text-left">
                        <v-btn class="mx-2" fab dark small color="primary" @click="createCategory">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in categories" :key="item.id">
                    <td>
                        <v-btn class="mx-2" fab dark small color="primary" @click="deleteCategory(item.id)">
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.insTime | dateFormatter}}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td style="white-space: nowrap; width: 1%">
                        <v-btn class="mx-2" fab dark small color="primary" @click.stop="editCategory(item)">
                            <v-icon>mdi-file-document-edit</v-icon>
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-col>
        <EditCategoryDialog formMode="EDIT" :category="categoryForEdit" :visible="showEditDialog" @close="showEditDialog=false"/>
        <EditCategoryDialog formMode="CREATE"  :visible="showCreateDialog" @close="showCreateDialog=false"/>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CategoryService from "@/services/CategoryService";
    import OperationService from "@/services/OperationService";
    import EditCategoryDialog from "@/components/category/EditCategoryDialog.vue";

    @Component({
        components: {EditCategoryDialog}
    })
    export default class CategoryList extends Vue {
        created() {
            // `this` указывает на экземпляр vm
            this.$store.dispatch("loadCategories");
        }

        createCategory() {
            this.showCreateDialog = true;
        }
        editCategory(category: any) {
            this.categoryForEdit = category;
            this.showEditDialog = true;
        }

        deleteCategory(id: string) {
            if (confirm("Вы действительно хотите удалить операцию?")) {
                OperationService.search({categoryIds: [{value: id}]})
                    .then((data) => {
                        if (data.content.length > 0) {
                            alert("Нельзя удалить категорию к которой привязаны операции");
                        } else {
                            CategoryService.delete(id)
                                .then((response) => {
                                        alert("Категория успешно удалена");
                                        this.$store.dispatch("loadCategories");
                                    }
                                );
                        }
                    });

            }
        }

        get categories() {
            return this.$store.state.categories;
        }

        data() {
            return {
                showEditDialog: false,
                showCreateDialog: false,
                categoryForEdit: {}
            };
        }
    }
</script>
