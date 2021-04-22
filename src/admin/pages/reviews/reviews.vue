<template lang="pug">
    .reviews-page-component
        .page-content
            .container
                .header
                    .title Блок "{{this.$route.meta.title}}"
                ul.cards
                    li.li-form(v-if="emptyCardIsShown")
                        formReviews(
                            :currentReview="currentReview"
                            @close="closeHandler"
                            )
                    li.item.empty-work(v-else)
                        square-btn(
                            v-if="emptyCardIsShown == false"
                            type="square"
                            title="Добавить отзыв"
                            @click="emptyCardIsShown = true"
                        )
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
import squareBtn from "../../components/button/button";
import { mapState, mapActions } from "vuex";

export default {
    components: { 
        formReviews, 
        reviewCard,
        squareBtn
    },
    data() {
        return {
            emptyCardIsShown:false,
            currentReview: null
        }
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
        edit(currentReview) {
            this.currentReview = { ...currentReview };
             this.emptyCardIsShown = true;
        },
        closeHandler(){
            this.emptyCardIsShown = false;
        }
    },
     watch: {
        emptyCardIsShown(){
            if(!this.emptyCardIsShown){
                this.currentReview = null
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
.li-form {
    width: calc(100% - 30px);
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