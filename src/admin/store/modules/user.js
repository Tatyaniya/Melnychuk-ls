export default {
    namespaced: true,
    state: {
       user: null
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload.user
        },
    },
    actions: {
        async getUser(context) {
            try {
                const user = await this.$axios.get('/user');
                context.commit('SET_USER', user.data);
            } catch (error) {
                console.log(error);
            }
            
        }
    },
    getters: {
        userIsLogged: ({ user }) => {
          return !!user;
        }
    }
}