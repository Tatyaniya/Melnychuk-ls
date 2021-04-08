<template lang="pug">
    .login-page-component
        .content
            form.form(@submit.prevent="handleSubmit")
                .form-title Авторизация
                .row
                    appInput(
                        title="Логин"
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
                    )
                .button
                    appButton Отправить
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";

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
        }
    }),
    components: {
        appInput,
        appButton
    },
    methods: {
        handleSubmit() {
            console.log(this.user.name, this.user.password);
        }
    }
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>