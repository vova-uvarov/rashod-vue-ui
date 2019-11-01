<template>
    <div class="accounts">
        <DebtAccountsList/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DebtAccountsList from '@/components/account/DebtAccountsList.vue';

@Component({components: {DebtAccountsList}})
export default class AccountsView extends Vue {
}
</script>
