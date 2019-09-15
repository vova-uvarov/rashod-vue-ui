<template>
    <div class="categories">
        <CategoryList/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CategoryList from '@/components/category/CategoryList.vue';

@Component({
    components: {
        CategoryList,
    },
})
export default class CategoriesView extends Vue {
}
</script>
