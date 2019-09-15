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
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class SelectShoppingItems extends Vue {
        @Prop({
            default: function() {
                return [];
            }
        })
        items;

        @Prop({
            default: function() {
                return [];
            }
        })
        selectedItems: object[];

        @Watch("selectedItemsInner")
        selectedItemsInnerChanged(value: string[], oldValue: string[]) {
            if (value != undefined) {
                this.$emit("update:selectedItems", value);
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
                selectedItemsInner: this.selectedItems,
                searchValue: ""
            };
        }

    }
</script>
}
