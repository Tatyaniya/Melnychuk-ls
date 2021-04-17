export default {
    namespaced: true,
    state: {
       reviews: []
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.reviews.push(newReview);
        },
        SET_REVIEWS(state, reviews) {
            state.reviews = reviews
        },
        REMOVE_REVIEW(state, id) {
            state.reviews = state.reviews.filter(review => review.id !== id);
        },
    },
    actions: {
        async add({ commit }, newReview) {
            const formData = new FormData();
                
            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            })

            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                throw new Error('Ошибка добавления отзыва');
            }
        },
        async get(store) {
            try {
                const userId = await store.rootState.user.user.id;
                const response = await this.$axios.get(`/reviews/${userId}`);
                store.commit("SET_REVIEWS", response.data);
            } catch (error) {
                throw new Error('Ошибка получения отзывов');
            }
        },
        async remove(store, id) {
            try {
                const response = await this.$axios.delete(`/reviews/${id}`);
                store.commit('REMOVE_REVIEW', id);
            } catch (error) {
                throw new Error('Ошибка удаления отзыва');
            }
        },
        edit() {
            
        }
    }
}