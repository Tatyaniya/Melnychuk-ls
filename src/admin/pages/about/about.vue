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
                pre {{categories}}
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
                            @approve="editCat($event, category)"
                            @remove="deleteCat(category.id)"
                            @createSkill="createSkill($event, category.id)"
                            @editSkill="editSkill"
                            @removeSkill="removeSkill"
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
            addSkillAction: "skills/add",
            editSkillAction: "skills/edit",
            removeSkillAction: "skills/remove",
        }),
        async createSkill(skill, categoryId) {
            const newSkill = {
                ...skill,
                category: categoryId
            }

            await this.addSkillAction(newSkill);

            skill.title = "";
            skill.percent = "";
        },
        async editSkill(skill) {
            await this.editSkillAction(skill);
            skill.editmode = false;
        },
        removeSkill(skill) {
            this.removeSkillAction(skill);
        },
        async createCategory(categoryTitle) {
            try {
                await this.createCategoryAction(categoryTitle);
                this.emptyCatIsShow = false;
            } catch (error) {
                console.log(error.message); 
            }
        },
        async deleteCat(id) {
            await this.deleteCategoryAction(id);
            this.categories = this.getCategoriesAction();

            return this.categories;            
        },
        async editCat(title, category) {
            console.log(title);
            await this.editCategoryAction(title, category);
            this.editmode = false;
        }
    },
    created() {
        this.getUserAction();
        this.categories = this.getCategoriesAction();
    },
};

</script>

<style lang="postcss" scoped src="./about.pcss"></style>