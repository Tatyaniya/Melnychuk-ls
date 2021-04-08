<template lang="pug">
    .about-page-component
        headline(title="Панель администрирования")
            user
        navigation
        .page-content
            .container
                .header
                    .title Блок "Обо мне"
                    iconed-btn(
                        type="iconed" 
                        title="Добавить группу" 
                        @click="emptyCatIsShow = true"
                        v-if="emptyCatIsShow === false"
                    )
                ul.skills
                    li.item(v-if="emptyCatIsShow")
                        category(empty @remove="emptyCatIsShow = false")
                    li.item(v-for="category in categories" :key="category.id")
                        category(
                            :title="category.category"
                            :skills="category.skills"
                        )
</template>

<script>
import headline from "../../components/headline";
import user from "../../components/user";
import navigation from "../../components/navigation";
import button from "../../components/button";
import category from "../../components/category";

export default {
    components: {
        headline,
        user,
        navigation,
        iconedBtn: button,
        category
    },
    data() {
        return {
            categories: [],
            emptyCatIsShow: false
        }
    },
    created() {
        this.categories = require("../../data/categories.json");
    }
};

</script>

<style lang="postcss" scoped src="./about.pcss"></style>