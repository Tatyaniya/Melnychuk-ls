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
        }
    },
    actions: {
        async addCategory(store, title) {
            try {
                const response = await this.$axios.post('/categories', {title: title});
                store.commit('ADD_CATEGORY', response.data);
                console.log("add", response);
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
        }
    }
}