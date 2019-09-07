<template>
    <v-combobox
            v-model="selectedItemsInner"
            :items="items"
            chips
            color="blue-grey lighten-2"
            label="Список покупок"
            multiple
    >
        <template v-slot:selection="data">
            <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
            >
                {{ data.item }}
            </v-chip>
        </template>

        <template v-slot:item="data">
            <template>
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
        </template>
    </v-combobox>
</template>
<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class SelectShoppingItems extends Vue {
        @Prop({default: []})
        items;

        @Prop({default: []})
        selectedItems: object[];

        @Watch("selectedItems")
        selectedItemsChanged(value: object[], oldValue: object[]) {

        }

        @Watch("selectedItemsInner")
        selectedItemsInnerChanged(value: string[], oldValue: string[]) {
            if (value != undefined) {
                let mapped = value.map((item) => {
                    return {name: item};
                });
                this.$emit("update:selectedItems", mapped);
            }
        }

        remove(item) {
            const index = this.selectedItemsInner.indexOf(item);
            if (index >= 0) {
                this.selectedItemsInner.splice(index, 1);
            }
        }

        data() {
            return {
                selectedItemsInner: this.selectedItems.map((item) => (item.name))
            };
        }

    }
</script>
}
