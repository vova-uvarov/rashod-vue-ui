<template>
    <div class="accounts">
        <GoalAccountsList/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import GoalAccountsList from "@/components/account/GoalAccountsList.vue";

    @Component({components: {GoalAccountsList}})
    export default class AccountsView extends Vue {
    }
</script>
