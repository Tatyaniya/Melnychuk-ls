export default {
    namespaced: true,
    state: {
        data: [],
        user: []
    },
    mutations: {
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),
        SET_USER: (state, user) => (state.data = user),
    },
    actions: {
        async create(store, title) {
            try {
                const response = await this.$axios.post('/categories', {title: title});
                commit('ADD_CATEGORY', response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            console.log(title);
        },
        async getUser(store) {
            try {
                const user = await this.$axios.post('/user');
                store.commit('SET_USER', response.data);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
            
        },
        async getCats(store) {
            try {
                const response = await this.$axios.get('/categories');
                store.commit('SET_CATEGORIES', response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            console.log(title);
        }
    }
}