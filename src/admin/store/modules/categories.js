export default {
    namespaced: true,
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        ADD_CATEGORY: (state, category) => state.categories.unshift(category)
    },
    actions: {
        async addCategory(store, title) {
            try {
                const response = await this.$axios.post('/categories', {title: title});
                commit('ADD_CATEGORY', response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            console.log(title);
        },
        async getCats(store) {
            try {
                const userId = store.rootState.user.id;
                const response = await this.$axios.get(`/categories/${userId}`);
                store.commit('SET_CATEGORIES', response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }
}