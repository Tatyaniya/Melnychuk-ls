export default {
    namespaced: true,
    state: {
       skills: []
    },
    mutations: {
        //SET_USER: (state, user) => (state.data = user),
    },
    actions: {
        async add(store, skill) {
            try {
                const response = await this.$axios.post('/skills', skill);
                store.commit('categories/ADD_SKILL', response.data, {root: true});
            } catch (error) {
                throw new Error('Не удалось создать скилл');
            }
        },
        remove() {
            console.log('remove');
        },
        edit() {
            console.log('edit');
        }
    }
}