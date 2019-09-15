<template>

    <v-row justify="center">
        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <v-card>
                <v-card-title v-if="formMode==='EDIT'">Редактирование категории: {{category.name}}</v-card-title>
                <v-card-title v-else>Создать категорию</v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                    label="Название"
                                    v-model="categoryInner.name"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                    label="Описание"
                                    v-model="categoryInner.description"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" v-if="formMode==='EDIT'">
                            <v-btn color="success" :block="true" v-on:click="updateCategory">Обновить</v-btn>
                        </v-col>
                        <v-col cols="12" v-else>
                            <v-btn color="success" :block="true" v-on:click="updateCategory">Создать</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">

    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import AccountService from "@/services/AccountService";
    import CategoryService from "@/services/CategoryService";

    @Component
    export default class EditCategoryDialog extends Vue {

        @Prop({default: "CREATE"})
        formMode: string;

        @Prop({default: {}})
        category: object;

        @Prop()
        visible: string;

        get showDialog() {
            return this.visible;
        }


        set showDialog(value) {
            if (!value) {
                this.$emit("close");
            }
        }

        @Watch("category")
        accountIdChanged(value: string, oldValue: string) {
            if (value) {
                this.categoryInner = JSON.parse(JSON.stringify(value));
            }
        }

        updateCategory() {
            CategoryService.save(this.categoryInner)
                .then((data) => {
                    alert("Категория успешно сохранена");
                    this.$store.dispatch("loadCategories");
                    this.$emit("close");
                });
        }

        data() {
            return {
                loading: false,
                categoryInner: {}
            };
        }
    }
</script>
