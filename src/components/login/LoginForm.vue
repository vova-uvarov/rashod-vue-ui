<template>
    <v-row justify="center" align="center">
        <v-col cols="4">
            <v-card :raised="true">
                <v-card-title>
                    <v-col> {{cardTitle}}</v-col>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="6">
                                <v-text-field
                                        label="Имя пользователя"
                                        v-model="userName"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-text-field
                                        type="password"
                                        label="Пароль"
                                        v-model="password"
                                ></v-text-field>
                            </v-col>
                        </v-row>


                        <v-row>
                            <v-col  cols="12">
                                <v-btn color="success" :block="true" v-on:click="login">
                                    <span>Войти</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class LoginForm extends Vue {

        public userName: string = '';

        public password: string = '';

        public login() {
            alert(this.userName);
        }
    }
</script>
