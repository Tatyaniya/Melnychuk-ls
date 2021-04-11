<template lang="pug">
    .about-page-component
        .page-content
            .container(v-if='categories.length')
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
                            @approve="editCategory(category.id)"
                            @remove="deleteCat(category.id)"
                        )
            .container(v-else)
                h3 Please, wait
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
            emptyCatIsShow: false
        }
    },
    computed: {
        ...mapState('categories', {
            categories: state => state.categories
        })
    },
    methods: {
        ...mapActions({
            createCategoryAction: 'categories/addCategory',
            deleteCategoryAction: 'categories/deleteCat',
            editCategoryAction: 'categories/editCat',
            getCategoriesAction: 'categories/getCats',
            getUserAction: 'user/getUser',
        }),
        async createCategory(categoryTitle) {
            try {
                this.createCategoryAction(categoryTitle);
                this.emptyCatIsShow = false;
            } catch (error) {
                console.log(error.message); 
            }
        },
        async deleteCat(id) {
            this.deleteCategoryAction(id);
            this.categories = this.getCategoriesAction();

            return this.categories;            
        },
        async editCat(id) {
            this.editCategoryAction(id);

            
        }
    },
    created() {
        //this.categories = require("../../data/categories.json");
        this.getUserAction();
        this.categories = this.getCategoriesAction();
    },
};

</script>

<style lang="postcss" scoped src="./about.pcss"></style>