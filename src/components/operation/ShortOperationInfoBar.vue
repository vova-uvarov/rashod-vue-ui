<template>
    <v-toolbar>
        Категория: {{operation.category.name}}, Сумма: {{operation.cost|moneyFormat}}, Место: {{operation.place}}
    </v-toolbar>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ShowOperationInfoBar extends Vue {
    @Prop()
    public operation!: object;
}
</script>
