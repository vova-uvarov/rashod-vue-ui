<template>
    <div class="accounts">
        <CategoryList/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import CategoryList from "@/components/CategoryList.vue";

    @Component({
        components: {
            CategoryList
        }
    })
    export default class AccountsView extends Vue {
    }
</script>
