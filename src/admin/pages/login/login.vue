<template lang="pug">
    .login-page-component
        .content
            form.form(@submit.prevent="handleSubmit")
                .form-title Авторизация
                .row
                    appInput(
                        title="Логин"
                        type="text"
                        v-model="user.name"
                        icon="user"
                        :errorMessage="validation.firstError('user.name')"
                    )
                .row
                    appInput(
                        title="Пароль"
                        v-model="user.password"
                        icon="key"
                        type="password"
                        :errorMessage="validation.firstError('user.password')"
                    )
                .button
                    appButton(
                        //typeAttr="submit"
                        title="Отправить"
                        :disabled="isSubmitDisabled"
                    ) 
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import axios from 'axios';

export default {
    mixins: [ValidatorMixin],
    validators: {
        "user.name": value => {
            return Validator.value(value).required('Введите имя');
        },
        "user.password": value => {
            return Validator.value(value).required('Введите пароль');
        }
    },
    data: () => ({
        user: {
            name: "",
            password: ""
        },
        isSubmitDisabled: false
    }),
    components: {
        appInput,
        appButton
    },
    methods: {
        handleSubmit() {
            //console.log(axios);
            this.$validate().then((isValid) => {
                if (isValid === false) return;

                this.isSubmitDisabled = true;

                axios.post('https://webdev-api.loftschool.com/login', this.user).then(response => {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    axios.defaults.headers['Autorization'] = `Bearer ${token}`;
                    this.$router.replace('/');
                    console.log(response);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    this.isSubmitDisabled = false;
                })
            });
        },
    },
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>