<template>
    <v-container fluid class="pa-2">
        <v-col cols="12">
            <CategoryTrend/>
        </v-col>
        <v-col cols="12">
            <CategoryYearTrend/>
        </v-col>
    </v-container>

</template>
<script lang="ts">
import CategoryTrend from '@/components/charts/CategoryTrend.vue';
import CategoryYearTrend from '@/components/charts/CategoryYearTrend.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
    components: {
        CategoryTrend, CategoryYearTrend,
    },
})
export default class CategoryTrendView extends Vue {
}
</script>

