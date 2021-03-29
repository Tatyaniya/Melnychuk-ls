import Vue from "vue";

const display = {
    template: "#works-display"
}

const info = {
    template: "#works-info"
}

const thumbs = {
    template: "#works-thumbs"
}

const btns = {
    template: "#works-btns"
}

const tags = {
    template: "#works-tags"
}

new Vue({
    el: "#works-component",
    template: "#works-container",
    components: {display, thumbs, btns, info, tags}
});

