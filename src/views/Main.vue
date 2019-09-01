<template>
    <div class="home">
        <span>{{myComputedProp}}</span>
        <LastOperations/>
        <CreateOperation/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CreateOperation from '@/components/CreateOperation.vue'; // @ is an alias to /src
    import LastOperations from '@/components/LastOperations.vue'; // @ is an alias to /src

    @Component({
        components: {
            CreateOperation,
            LastOperations,
        }
    })
    export default class Main extends Vue {
        get myComputedProp() {
            return this.$store.state.testVar;
        }
    }
</script>
