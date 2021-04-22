import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const thumbs = {
    props: ["works", "currentWork"],
    template: "#works-thumbs"
}

const btns = {
    template: "#works-btns",
}

const display = {
    props: ["currentWork", "works", "currentIndex"],
    template: "#works-display",
    components: {thumbs, btns},
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.slice(0, 4).reverse();
        }
    }
}

const tags = {
    template: "#works-tags",
    props: ["tags"]
}

const info = {
    props: ["currentWork", "tagsArray"],
    template: "#works-info",
    components: {tags},
    computed: {
        tagsArray() {
            return this.currentWork.techs.split(",");
        }
    }
}

new Vue({
    el: "#works-component",
    template: "#works-container",
    components: {
        display, 
        info
    },
    data() {
        return {
            works: [],
            currentIndex: 0,
        }
    },
    computed: {
        currentWork() {
            return this.works[0];
        },
    },
    watch: {
        currentIndex(value) {
            this.makeInfiniteLoopForNdx(value);
        }
    },
    methods: {
        enterCb(el, done) {

        },
        makeInfiniteLoopForNdx(index) {
            const worksNumber = this.works.length - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        },
        slide(direction) {
            const lastItem = this.works[this.works.length - 1];
            switch(direction) {
                case "next":
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex++;
                    break;
                case "prev":
                    this.works.unshift(lastItem);
                    this.works.pop();
                    this.currentIndex--;
                    break;
            }
        }
    },
    async created() {
        const { data } = await axios.get("/works/454");
        this.works = data;
    }
});
