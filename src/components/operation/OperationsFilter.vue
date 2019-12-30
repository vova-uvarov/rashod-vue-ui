<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <select-date label="Дата С" :date.sync="operationFilter.dateFrom"/>
            </v-col>

            <v-col cols="3">
                <select-date label="Дата По" :date.sync="operationFilter.dateTo"/>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="categories"
                        v-model="operationFilter.categoryIds"
                        :clearable="true"
                        multiple
                        :search-input.sync="searchCategoryValue"
                        @change="searchCategoryValue = ''"
                        label="Категория"
                ></v-combobox>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        :items="accounts"
                        v-model="operationFilter.accountIds"
                        :clearable="true"
                        multiple
                        label="Счет"
                        :search-input.sync="searchAccountValue"
                        @change="searchAccountValue = ''"
                ></v-combobox>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3">
                <v-text-field
                        type="number"
                        label="Сумма С"
                        v-model="operationFilter.costFrom"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                        type="number"
                        label="Сумма По"
                        v-model="operationFilter.costTo"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-combobox
                        v-model="operationFilter.place"
                        :items="places"
                        label="Место"
                ></v-combobox>
            </v-col>

            <v-col cols="3">
                <v-select
                        :items="operationTypes"
                        v-model="operationFilter.operationTypes"
                        item-text="value"
                        item-value="key"
                        clearable
                        multiple
                        label="Тип операции"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-text-field
                        type="text"
                        label="Комментарий"
                        v-model="operationFilter.comment"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <SelectShoppingItems
                        :selectedItems.sync="operationFilter.shoppingList"
                        :items="shoppingItems"/>
            </v-col>
            <v-col cols="3">
                <v-switch
                        v-model="operationFilter.isPlan"
                        label="План?"
                ></v-switch>
            </v-col>
            <v-col cols="3">
                <v-select
                        :items="countsPerPage"
                        v-model="operationFilter.size"
                        label="Отображать на странице"
                ></v-select>
            </v-col>


        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn color="success" :block="true" v-on:click="applyFilter">Применить фильтр
                </v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
import SelectShoppingItems from '@/components/operation/SelectShoppingItems.vue';
import SelectDate from '@/components/common/SelectDate.vue';
import ObjectUtils from "@/utils/ObjectUtils";
import Debounce from "@/utils/CustomDecorators";

@Component({
    components: {SelectShoppingItems, SelectDate}
})
export default class OperationsFilter extends Vue {

    get shoppingItems() {
        return this.$store.getters.shoppintItemNamesAll;
    }

    get countsPerPage() {
        return [5, 10, 20, 50, 100];
    }

    get places(){
        return this.$store.state.places;
    }

    get accounts() {
        return this.$store.state.accounts.map((val: any) => ({
            text: val.name,
            value: val.id,
        }));
    }

    get operationTypes() {
        return this.$store.state.staticDictionaries.operationTypes;
    }

    get categories() {
        return this.$store.state.categories.map((val: any) => ({
            text: val.name,
            value: val.id,
        }));
    }


    public operationFilter = ObjectUtils.copy(this.$store.state.operationsView.filter);
    public searchCategoryValue = '';
    public searchAccountValue = '';

    @Watch("operationFilter",{deep:true,immediate: true})
    public operationFilterChanged(value: string, oldValue: string) {
        this.$root.$emit('opertionFilterChanged');
        this.applyFilter();
    }


    @Debounce(500)
    public applyFilter() {
        this.$store.commit('updateOperationsFilter', ObjectUtils.copy(this.operationFilter));
        this.$store.dispatch('reloadOperations');
    }
}
</script>
