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
        async get(state) {
            try {
                const response = await this.$axios.get("/reviews/454");
                state.commit("SET_REVIEWS", response.data);
            } catch (error) {
                throw new Error('Ошибка получения отзывов');
            }
        },
        remove() {

        },
        edit() {
            
        }
    }
}