export default {
    namespaced: true,
    state: {
       user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.data = user
        },
    },
    actions: {
        async getUser(context) {
            try {
                const user = await this.$axios.get('/user');
                context.commit('SET_USER', user.data);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
            
        }
    }
}