<template lang="pug">
    .reviews-page-component
        .page-content
            .container
                .header
                    .title Блок "{{this.$route.meta.title}}"
                .form
                    formReviews
                ul.cards
                    li.item(v-for="review in reviews" :key="review.id")
                        reviewCard(
                            :review="review"
                            @edit="edit"
                            @remove="remove(review.id)"
                        )
</template>

<script>
import formReviews from "../../components/formReviews";
import reviewCard from "../../components/reviewCard";
import { mapState, mapActions } from "vuex";

export default {
    components: { 
        formReviews, 
        reviewCard 
    },
    computed: {
        ...mapState("reviews", {
        reviews: (state) => state.reviews,
        }),
    },
    methods: {
        ...mapActions({
            getReviews: "reviews/get",
            removeReview: "reviews/remove",
            editReview: "reviews/edit",
            showTooltip: "tooltips/show"
        }),
        remove(currentReviewId) {
            try {
                this.removeReview(currentReviewId);
                this.showTooltip({
                    text: "Отзыв успешно удален",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        },
        edit(currentWork) {
            try {
                this.editReview(currentReview);
                this.showTooltip({
                    text: "Отзыв успешно изменен",
                    type: "success"
                })
            } catch (error) {
                this.showTooltip({
                    text: error.response.data.error,
                    type: "error"
                })
            }
        }
    },
    mounted() {
        this.getReviews();
    }
}
</script>

<style scoped lang="postcss">
.page-content {
  padding: 60px 0 20px;
  background: url("../../../images/bg/admin.jpg") center center / cover no-repeat;
  flex: 1;
}

.header {
  margin-bottom: 60px;
}
.title {
  font-size: 21px;
  font-weight: bold;
  color: $text-dark;
}
.cards {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
    padding-top: 60px;
}
.item {
    width: calc(33% - 30px);
    margin-left: 15px;
    margin-right: 15px;
}
</style>