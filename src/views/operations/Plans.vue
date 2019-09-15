<template>
    <div class="plans">
        <v-tabs
                v-model="tab"
                align-with-title
                background-color="transparent"
        >
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in itemTabs" :key="item">
                {{ item }}
            </v-tab>
        </v-tabs>
        <OperationsList :operations="operations(itemTabs[tab])"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import OperationsList from "../../components/operation/OperationsList.vue"; // @ is an alias to /src

    @Component({
        components: {
            OperationsList
        }
    })
    export default class PlansView extends Vue {
        created() {
            this.$store.dispatch("loadPlans");
        }

        operations(categoryName: string) {
            console.log("categoryName=" + categoryName);
            return this.$store.state.operationPlans.operations.filter((op)=>(op.category.name==categoryName));
        }

        get itemTabs() {
            let categoryNames = this.$store.state.operationPlans.operations.map((op) => (op.category.name));
            return Array.from(new Set(categoryNames)); // this is distinct
        }

        mounted() {
            this.$root.$on("operationDeleted", () => {
                this.$store.dispatch("loadPlans");
            });
        }

        data() {
            return {
                tab: null
            };
        }
    }
</script>
