<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-if="isAuthenticated"
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Главная страница
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/operations">
                    <v-list-item-action>
                        <v-icon>mdi-bank-transfer</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Операции
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!--                todo похоже на подраздел в операциях-->
                <v-list-item to="/plans">
                    <v-list-item-action>
                        <v-icon>mdi-finance</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            План ({{countPlans}})
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/categories">
                    <v-list-item-action>
                        <v-icon>mdi-format-list-bulleted-type</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Категории
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                        prepend-icon="mdi-account-details"
                >

                    <template v-slot:activator>
                        <v-list-item-title>Счета</v-list-item-title>
                    </template>

                    <v-list-item to="/accounts/common">
                        <v-list-item-action>
                            <v-icon>mdi-account-details</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Список
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/accounts/goal">
                        <v-list-item-action>
                            <v-icon>mdi-account-details</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Цели
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/accounts/debts">
                        <v-list-item-action>
                            <v-icon>mdi-account-details</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Долги
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-group
                        prepend-icon="mdi-chart-pie"
                >
                    <template v-slot:activator>
                        <v-list-item-title>Статистика</v-list-item-title>
                    </template>
                    <v-list-item to="/statistics/common">
                        <v-list-item-action>
                            <v-icon>mdi-chart-pie</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Общая
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/statistics/categoryTrend">
                        <v-list-item-action>
                            <v-icon>mdi-chart-pie</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Динамика
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/statistics/byYear">
                        <v-list-item-action>
                            <v-icon>mdi-chart-pie</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                По годам
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                </v-list-group>
                <v-list-item to="/params">
                    <v-list-item-action>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Параметры
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
                :color="appBarColor"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Домашние финансы</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn v-on:click="logout">
                Выйти
            </v-btn>
        </v-app-bar>


        <v-content>
            <v-container fluid>
                <BalanceListBar v-if="isAuthenticated"/>
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>Владимир Уваров &copy; 2021. rashod-java ver 0.0.1</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
    import BalanceListBar from "./components/BalanceListBar";
    import {Component, Prop} from "vue-property-decorator";
    import Vue from "vue";
    import OperationService from "@/services/OperationService";

    @Component({
        components: {BalanceListBar}
    })
    export default class extends Vue {

        @Prop()
        soure!: String;

        drawer = null;

        public countPlans = 0;

        get isAuthenticated(){
            return this.$store.getters.isAuthenticated;
        }

        get appBarColor(){
            if (process.env.NODE_ENV==='development'){
                return 'red';
            }
            return 'primary';
        }

        public logout() {
            this.$store.dispatch("logout");
        }

        public mounted() {
            this.$root.$on('operationChanged', () => {
                this.$store.dispatch("loadShoppingItems");
                this.$store.dispatch("loadPlaces");
                this.$store.dispatch("loadTags");
                OperationService.countPlans()
                    .then((data: any) => {
                        this.countPlans = data;
                    });
            });
        }

        created() {
            this.$vuetify.theme.dark = false;
            this.$store.commit("initState");

            this.$store.dispatch("loadShoppingItems");
            this.$store.dispatch("loadPlaces");
            this.$store.dispatch("loadTags");

            this.$store.dispatch("loadDictionaries");

            this.$store.dispatch("loadAccounts");
            this.$store.dispatch("loadCategories");
            this.$store.dispatch("loadParams");

            this.$store.dispatch("loadYears");

            OperationService.countPlans()
                .then((data: any) => {
                    this.countPlans = data;
                });
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
