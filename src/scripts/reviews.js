import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";
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
    async created() {
        const { data } = await axios.get("/reviews/454");
        
        this.reviews = data.map(review => {
            review.photo = `https://webdev-api.loftschool.com/${review.photo}`;
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
    watch: {
        reviews() {
            if(this.reviews.length) {
                this.loadFlickity()
            }
        }
    },
    methods: {
        next() {
          this.$refs.flickity.next();
        },
        prev() {
          this.$refs.flickity.previous();
        },
        loadFlickity() {
            this.$nextTick(() => {
                this.$refs.flickity.on('change', index => {
                    this.currentSlide = index;
                });
        
                this.count = this.$refs.flickity.slides().length - 1
            })
        }
    }
})