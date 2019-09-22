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
import {Component, Vue} from 'vue-property-decorator';
import OperationsList from '@/components/operation/OperationsList.vue';

@Component({
    components: {
        OperationsList,
    },
})
export default class PlansView extends Vue {

    get itemTabs() {
        const categoryNames = this.$store.state.operationPlans.operations.map((op: any) => (op.category.name));
        return Array.from(new Set(categoryNames)); // this is distinct
    }

    public tab = null;
    public created() {
        this.$store.dispatch('loadPlans');
    }

    public operations(categoryName: any) {
        return this.$store.state.operationPlans.operations.filter((op: any) => (op.category.name === categoryName));
    }

    public mounted() {
        this.$root.$on('operationChanged', () => {
            this.$store.dispatch('loadPlans');
        });
    }
}
</script>
