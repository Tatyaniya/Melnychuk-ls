<template lang="pug">
    .app-container
        headline(title="Панель администрирования")
            user
        navigation
        .page-content
            .container
                .header
                    .title Блок "Обо мне"
                    iconed-btn(type="iconed" title="Добавить группу")
                //category
</template>

<script>
import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import button from "./components/button";
//import category from "./components/category";

export default {
    components: {
        headline,
        user,
        navigation,
        iconedBtn: button,
        //category
    }
};

</script>

<style lang="postcss">
    @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
    @import "normalize.css";
    @import "../styles/mixins.pcss";
    @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>