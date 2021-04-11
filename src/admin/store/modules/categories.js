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
        DELETE_CATEGORY(state) {
            return state.categories;
        },
        EDIT_CATEGORY(state, aditCategory) {
            state.categories.map(category => {
                if(category.id = aditCategory.id) {
                    category.category = aditCategory.category;
                }

                return category;
            })
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
                // const userId = await store.rootState.user.user.id;
                // const response = await this.$axios.get(`/categories/${userId}`);
                const response = await this.$axios.get('/categories/454');
                store.commit('SET_CATEGORIES', response.data);
            } catch (error) {
                throw new Error('Произошла ошибка');
            }
        },
        async deleteCat(store, id) {
            try {
                await this.$axios.delete(`/categories/${id}`);
                store.commit('DELETE_CATEGORY');
            } catch (error) {
                console.log(error);
            }
        },
        async editCat(store, category) {
            try {
                const response = await this.$axios.post(`/categories/${category.id}`, {title: category.title});
                store.commit('EDIT_CATEGORY', response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}