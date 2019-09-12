<template>
    <v-container fluid class="pa-2">

                    <CategoryTrend/>

    </v-container>

</template>
<script lang="ts">
    import CategoryTrend from "@/components/charts/CategoryTrend.vue";
    import {Component, Vue} from "vue-property-decorator";
    import StatisticsService from "@/services/StatisticsService";

    @Component({
        components: {
            CategoryTrend
        }
    })
    export default class StatisticsVue extends Vue {

        mounted(){
            StatisticsService.categoryTrend(this.dateFrom, this.dateTo, this.categoryIds)
        }
    }
</script>

