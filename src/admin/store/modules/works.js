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
        }
    },
    actions: {
        async add({ commit }, newWork) {
            console.log(newWork);
            const formData = new FormData();
                
            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            // for (let entry of formData.entries()) {
            //     console.log(entry);
            // }
    
            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                console.log("error");
            }
        },
    
        async get({commit}) {
            try {
                const { data } = await this.$axios.get("/works/454");
                commit("SET_WORKS", data);
            } catch (error) {
                console.log("error");
            }
        }
    },
}