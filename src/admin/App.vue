<template lang="pug">
    .app-container
        router-view(name="header" @logout="logout")
        router-view
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    methods: {
        ...mapActions({
            logoutAction: 'user/userOut',
        }),
        logout() {
            localStorage.clear();
            this.$axios.defaults.headers['Authorization'] = '';
            this.logoutAction();
            this.$router.replace('/login');
        }
    }
}

</script>

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
    @import "normalize.css";
    @import "../styles/mixins.pcss";
    @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>