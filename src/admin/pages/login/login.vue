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
                        :disabled="isSubmitDisabled"
                    ) Отправить
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import { mapActions } from 'vuex';

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
        ...mapActions({
            getUser: 'user/getUser',
            showTooltip: "tooltips/show"
        }),
        async handleSubmit() {
            if( await  this.$validate() === false ) {
                return;
            }

            this.isSubmitDisabled = true;

            try {
                const response = await this.$axios.post('/login', this.user);
                const token = response.data.token;

                localStorage.setItem('token', token);
                this.$axios.defaults.headers['Authorization'] = `Bearer ${token}`;

                await this.getUser();
                this.$router.replace('/');
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            } finally {
                this.isSubmitDisabled = false;
            }
        }
    }
}
</script>

<style lang="postcss" scoped src="./login.pcss"></style>