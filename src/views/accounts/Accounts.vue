<template>
    <div class="accounts">
        <AccountsList/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import AccountsList from '@/components/account/AccountsList.vue';

    @Component({
        components: {
            AccountsList
        }
    })
    export default class AccountsView extends Vue { }
</script>
