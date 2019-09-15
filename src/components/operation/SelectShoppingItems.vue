<template>
    <div>
        <v-combobox
                v-model="selectedItemsInner"
                :items="items"
                chips
                color="blue-grey lighten-2"
                label="Список покупок"
                multiple
                item-text="name"
                item-value="name"
                return-object
                :search-input.sync="searchValue"
                @change="searchValue = ''"
        >
            <template v-slot:selection="data">
                <v-chip
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="remove(data.item)"
                >
                    {{ data.item.name }}
                </v-chip>
            </template>

            <template v-slot:item="data">
                <template>
                    <v-list-item-content v-text="data.item.name"></v-list-item-content>
                </template>
            </template>
        </v-combobox>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, PropSync, Vue} from "vue-property-decorator";

    @Component
    export default class SelectShoppingItems extends Vue {
        @Prop({
            default: function() {
                return [];
            }
        })
        items!: object[];

        @PropSync("selectedItems", {
            default: function() {
                return [];
            }
        })
        selectedItemsInner!: object[];

        remove(item: any) {
            const index = this.selectedItemsInner.indexOf(item);
            if (index >= 0) {
                this.selectedItemsInner.splice(index, 1);
            }
        }

        searchValue = "";

    }
</script>
}
