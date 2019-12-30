<template>
    <div class="operations">
        <v-expansion-panels>
            <v-expansion-panel key="operationsFilter">
                <v-expansion-panel-header>Фильтр</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <OperationsFilter/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <OperationsList :operations="operations" :loading="loading"/>
        <template>
            <div class="text-center">
                <v-pagination
                        v-model="page"
                        :length="length"
                        :total-visible="8"
                        circle
                ></v-pagination>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
import OperationsList from '@/components/operation/OperationsList.vue';
import OperationsFilter from '@/components/operation/OperationsFilter.vue';

@Component({
    components: {
        OperationsFilter,
        OperationsList,
    },
})
export default class OperationsView extends Vue {
    public loading:boolean = false;

    public created() {
        this.$store.dispatch('reloadOperations');
    }

    get operations() {
        return this.$store.state.operationsView.operations;
    }

    get page() {
        return this.$store.state.operationsView.currentPage;
    }

    set page(value) {
        this.$store.commit('setOperationViewCurrentPage', value);
        this.$store.dispatch('reloadOperations');
    }

    get length() {
        return this.$store.state.operationsView.totalPages;
    }

    @Watch("operations")
    public operationReloaded(){
        this.loading = false;
    }

    public mounted() {
        this.$root.$on('operationChanged', () => {
            this.$store.dispatch('reloadOperations');
        });

        this.$root.$on('opertionFilterChanged', () => {
            this.loading = true;
        });
    }
}
</script>
