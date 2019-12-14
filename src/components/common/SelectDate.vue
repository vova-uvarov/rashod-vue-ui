<template>
    <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="dateInner"
                    :label="label"
                    prepend-icon="mdi-calendar-range"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="dateInner"
                       @input="dateMenu = false"></v-date-picker>
    </v-menu>
</template>
<script lang="ts">
    import {Component, Prop, PropSync, Vue} from "vue-property-decorator";

    @Component
    export default class SelectDate extends Vue {
        @Prop({default: "Дата"})
        public label!: string;

        @PropSync("date", {default: ""})
        public dateInner!: any;

        public dateMenu = false;
    }
</script>
}
