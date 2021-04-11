<template lang="pug">
    .about-page-component
        .page-content
            .container
                .header
                    .title Блок "{{this.$route.meta.title}}"
                    iconedBtn(
                        type="iconed" 
                        title="Добавить группу" 
                        @click="emptyCatIsShow = true"
                        v-if="emptyCatIsShow === false"
                    )
                ul.skills
                    li.item(v-if="emptyCatIsShow")
                        category(
                            empty 
                            @remove="emptyCatIsShow = false"
                            @approve="createCategory"
                        )
                    li.item(v-for="category in categories" :key="category.id")
                        category(
                            :title="category.category"
                            :skills="category.skills"
                        )
</template>

<script>
import button from "../../components/button";
import category from "../../components/category";
import { mapActions, mapState } from 'vuex';

export default {
    components: {
        iconedBtn: button,
        category
    },
    data() {
        return {
            categories: [],
            emptyCatIsShow: false
        }
    },
    computed: {
        ...mapState('categories', {
            categories: state => state.data
        })
    },
    methods: {
        ...mapActions({
            createCategoryAction: 'categories/addCategory',
            getCategoriesAction: 'categories/getCats',
        }),
        createCategory(categoryTitle) {
            console.log(categoryTitle);
            //this.createCategoryAction(categoryTitle);
        }
    },
    created() {
        this.categories = require("../../data/categories.json");
        // this.getCategoriesAction();
        // this.getUserAction();
        //console.log(this.getUserAction());
    },
};

</script>

<style lang="postcss" scoped src="./about.pcss"></style>