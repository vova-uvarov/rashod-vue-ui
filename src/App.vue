<template>
    <v-app id="inspire">
        <v-navigation-drawer
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
                            План
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

                    <v-list-item to="/accounts/debt">
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
                color="primary"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Домашние финансы</v-toolbar-title>
        </v-app-bar>


        <v-content>
            <v-container fluid>
                <BalanceListBar/>
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>Владимир Уваров &copy; 2019. rashod-java ver 0.0.1</span>
        </v-footer>
    </v-app>
</template>

<script>
    import BalanceListBar from "./components/BalanceListBar";

    export default {
        components: {BalanceListBar},
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),
        created() {
            this.$vuetify.theme.dark = false;
            this.$store.commit("initState");
            //todo надо наверное объеденить в рамках метода loadDictionaries
            this.$store.dispatch("loadDictionaries");

            this.$store.dispatch("loadAccounts");
            this.$store.dispatch("loadCategories");
            this.$store.dispatch("loadShoppingItems");
            this.$store.dispatch("loadPlaces");
            this.$store.dispatch("loadParams");
            this.$store.dispatch("loadParamGroups");
            this.$store.dispatch("loadParamKeys");
            this.$store.dispatch("loadYears");
        },
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
