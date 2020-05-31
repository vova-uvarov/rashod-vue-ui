<template>
    <v-row justify="center">
        <v-dialog
                max-width="790"
                v-model="showDialog"
        >
            <CreateOperationComponent/>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import CreateOperationComponent from '@/components/operation/CreateOperationComponent';

    @Component({
        components: {CreateOperationComponent}
    })
    export default class CreateOperationDialog extends Vue {

        get showDialog() {
            return this.visible;
        }

        @Prop()
        public visible!: string;
    }
</script>
