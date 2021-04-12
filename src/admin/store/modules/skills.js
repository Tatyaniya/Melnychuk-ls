export default {
    namespaced: true,
    state: {
       skills: []
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
        async remove(store, skill) {
            try {
                const response = await this.$axios.delete(`/skills/${skill.id}`);
                store.commit('categories/REMOVE_SKILL', skill, {root: true});
            } catch (error) {
                throw new Error('Ошибка удаления скилла');
            }
        },
        async edit(store, skill) {
            try {
                const response = await this.$axios.post(`/skills/${skill.id}`, skill);
                store.commit('categories/EDIT_SKILL', response.data.skill, {root: true});
            } catch (error) {
                throw new Error('Ошибка редактирования скилла');
            }
        }
    }
}