<template>
    <div class="appParams">
        <AppParamsList/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import AppParamsList from "@/components/params/AppParamsList.vue";

    @Component({
        components: {AppParamsList}
    })
    export default class OperationsView extends Vue {

    }
</script>
