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

export default {
    data: () => ({}),
    components: {
        appInput,
        appButton
    }
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>