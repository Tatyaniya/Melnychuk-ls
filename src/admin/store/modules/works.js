export default {
    namespaced: true,
    state: {
        works: [],
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.works.push(newWork);
        },
        SET_WORKS(state, works) {
            state.works = works
        },
        REMOVE_WORK(state, id) {
            state.works = state.works.filter(work => work.id !== id);
        },
        EDIT_WORK(state, workEdited) {
            state.works = state.works.map(work => {
                if(work.id === workEdited.id) {
                    work = workEdited;
                }

                return work;
            });
        }
    },
    actions: {
        async add({ commit }, newWork) {
            const formData = new FormData();
                
            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })
            
            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                throw new Error('Ошибка добавления работы');
            }
        },
        async get({commit}) {
            try {
                const { data } = await this.$axios.get("/works/454");
                commit("SET_WORKS", data);
            } catch (error) {
                throw new Error('Ошибка получения работ');
            }
        },
        async remove(store, id) {
            try {
                const response = await this.$axios.delete(`/works/${id}`);
                store.commit('REMOVE_WORK', id);
            } catch (error) {
                throw new Error('Ошибка удаления работы');
            }
        },
        async edit(store, work) {
            try {
                const response = await this.$axios.post(`/work/${work.id}`, work);
                store.commit('EDIT_WORK', response.data.work);
            } catch (error) {
                throw new Error('Ошибка редактирования работы');
            }
        }
    },
}