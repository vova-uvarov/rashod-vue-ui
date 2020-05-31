<template>
    <div class="Login">
        <LoginForm/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CategoryList from '@/components/category/CategoryList.vue';
import LoginForm from '@/components/login/LoginForm.vue';

@Component({
    components: {
        LoginForm,
    },
})
export default class LoginView extends Vue {
}
</script>
