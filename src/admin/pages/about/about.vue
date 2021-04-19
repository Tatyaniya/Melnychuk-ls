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
            showTooltip: "tooltips/show"
        }),
        async createSkill(skill, categoryId) {
            const newSkill = {
                ...skill,
                category: categoryId
            }

            try {
                await this.addSkillAction(newSkill);

                skill.title = "";
                skill.percent = "";
               
                this.showTooltip({
                    text: "Навык успешно добавлен",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        async editSkill(skill) {
            try {
                await this.editSkillAction(skill);
                skill.editmode = false;
               
                this.showTooltip({
                    text: "Навык успешно изменен",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        async removeSkill(skill) {
            try {
                await this.removeSkillAction(skill);
                this.showTooltip({
                    text: "Навык успешно удален",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        async createCategory(categoryTitle) {
            try {
                await this.createCategoryAction(categoryTitle);
                this.emptyCatIsShow = false;

                this.showTooltip({
                    text: "Категория успешно создана",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                }) 
            }
        },
        async deleteCat(id) {
            try {
                await this.deleteCategoryAction(id);

                this.showTooltip({
                    text: "Категория успешно удалена",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }            
        },
        async editCat(title, category) {
            try {
                category.title = title;
                await this.editCategoryAction(category);
                this.editmode = false;

                this.showTooltip({
                    text: "Категория успешно изменена",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        }
    },
    created() {
        this.getUserAction();
        this.getCategoriesAction();
    },
};

</script>

<style lang="postcss" scoped src="./about.pcss"></style>