<template>
    <div class="operations">
        <v-expansion-panels>
            <v-expansion-panel :key="operationsFilter">
                <v-expansion-panel-header>Фильтр</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <OperationsFilter/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <OperationsList/>
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
    import {Component, Vue} from "vue-property-decorator";
    import OperationsList from "@/components/OperationsList.vue";
    import OperationsFilter from "@/components/OperationsFilter.vue"; // @ is an alias to /src

    @Component({
        components: {
            OperationsFilter,
            OperationsList,
        }
    })
    export default class OperationsView extends Vue {
        get page() {
            return this.$store.state.operationsView.currentPage;
        }

        set page(value) {
            this.$store.commit("setOperationViewCurrentPage", value);
            this.$store.dispatch("loadOperations");
        }

        get length() {
            return this.$store.state.operationsView.totalPages;
        }
    }
</script>
