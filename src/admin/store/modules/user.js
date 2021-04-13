export default {
    namespaced: true,
    state: {
       user: null
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload.user
        },
        DELETE_USER(state) {
            state.user = null;
        }
    },
    actions: {
        async getUser(context) {
            try {
                const user = await this.$axios.get('/user');
                context.commit('SET_USER', user.data);
            } catch (error) {
                console.log(error);
            }
            
        },
        userOut(state) {
            state.commit('DELETE_USER');
            localStorage.removeItem('token');
            this.$axios.defaults.headers['Authorization'] = '';
        }
    },
    getters: {
        userIsLogged: ({ user }) => {
          return !!user;
        }
    }
}