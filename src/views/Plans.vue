<template>
    <div class="plans">
        <OperationsList :operations="operations"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import OperationsList  from '../components/OperationsList.vue'; // @ is an alias to /src

    @Component({
        components: {
            OperationsList
        }
    })
    export default class PlansView extends Vue {
        created(){
            this.$store.dispatch("loadPlans");
        }
        get operations() {
            return this.$store.state.operationPlans.operations;
        }

        mounted() {
            this.$root.$on("operationDeleted", () => {
                this.$store.dispatch("loadPlans");
            });
        }
    }
</script>
