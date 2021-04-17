export default {
    namespaced: true,
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        ADD_CATEGORY(state, category) {
            state.categories.unshift(category);
        },
        DELETE_CATEGORY(state, id) {
            state.categories = state.categories.filter(category => category.id !== id);
        },
        EDIT_CATEGORY(state, editedCat) {
            state.categories = state.categories.map(category => {
                if(category.id === editedCat.id) {
                    category = editedCat;
                }

                return category;
            })
        },
        ADD_SKILL(state, newSkill) {
            state.categories = state.categories.map(category => {
                if (category.id === newSkill.category) {
                    category.skills.push(newSkill);
                }

                return category;
            })
        },
        REMOVE_SKILL(state, skillDelete) {
            state.categories = state.categories.map(category => {
                if (category.id === skillDelete.category) {
                    category.skills = category.skills.filter(skill => skill.id !== skillDelete.id)
                }

                return category;
            })
        },
        EDIT_SKILL(state, skill) {
            const editSkill = category => {
                category.skills = category.skills.map(item => {
                    return item.id === skill.id ? skill : item;
                })
            }
            const findCategory = category => {
                if (category.id === skill.category) {
                    editSkill(category);
                }

                return category;
            }
            state.categories = state.categories.map(findCategory)
        }
    },
    actions: {
        async addCategory(store, title) {
            try {
                const response = await this.$axios.post('/categories', {title: title});
                store.commit('ADD_CATEGORY', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getCats(store) {
            try {
                const userId = await store.rootState.user.user.id;
                const response = await this.$axios.get(`/categories/${userId}`);
                store.commit('SET_CATEGORIES', response.data);
            } catch (error) {
                throw new Error('Ошибка добавления категории');
            }
        },
        async deleteCat(store, id) {
            try {
                await this.$axios.delete(`/categories/${id}`);
                store.commit('DELETE_CATEGORY', id);
            } catch (error) {
                throw new Error('Ошибка удаления категории');
            }
        },
        async editCat(store, category) {
            try {
                const response = await this.$axios.post(`/categories/${category.id}`, {title: category.title});
                store.commit('EDIT_CATEGORY', response.data);
            } catch (error) {
                throw new Error('Ошибка редактирования категории');
            }
        }
    }
}