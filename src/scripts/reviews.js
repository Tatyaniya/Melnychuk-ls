import Vue from "vue";
import Flickity from 'vue-flickity';

new Vue({
    el: '#reviews-template',
    template: '#reviews-container',
    components: {
        Flickity
    },
    data() {
        return {
            reviews: [],
            currentSlide: 0,
            count: 0,
            flickityOptions: {
                groupCells: true,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true
            }
        }
    },
    created() {
        const reviews = require("../data/reviews.json");
        this.reviews = reviews.map(review => {
            review.pic = require(`../images/content/${review.pic}`).default;
            return review;
        });
    },
    computed: {
        hasPrev() {
            return this.currentSlide;
        },
        hasNext() {
            return this.count !== this.currentSlide;
        }
    },
    mounted() {
        this.$refs.flickity.on('change', index => {
            this.currentSlide = index;
        });

        this.count = this.$refs.flickity.slides().length - 1
    },
    methods: {
        next() {
          this.$refs.flickity.next();
        },
        prev() {
          this.$refs.flickity.previous();
        }
    }
})