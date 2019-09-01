<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item @click="">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <router-link to="/">Главная страница</router-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="">
                    <v-list-item-action>
                        <v-icon>mdi-account-details</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <router-link to="/accounts">Счета</router-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="">
                    <v-list-item-action>
                        <v-icon>mdi-bank-transfer</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <router-link to="/operations">Операции</router-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="">
                    <v-list-item-action>
                        <v-icon>mdi-chart-pie</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <router-link to="/statistics">Статистика</router-link>
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
            <v-container
                    fluid
            >
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>Владимир Уваров &copy; 2019. rashod-java ver 0.0.1</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),
        created() {
            this.$vuetify.theme.dark = false
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
