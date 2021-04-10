import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import header from "./components/header";
import about from "./pages/about";
import works from "./pages/works";
import reviews from "./pages/reviews";
import login from "./pages/login";

const routes = [
  {
    path: "/",
    components: {
      default: about,
      header: header
    },
    meta: {
        title: "Обо мне"
    }
  },
  {
    path: "/works",
    components: {
      default: works,
      header: header
    },
    meta: {
        title: "Работы"
    }
  },
  {
    path: "/reviews",
    components: {
      default: reviews,
      header: header
    },
    meta: {
        title: "Отзывы"
    }
  },
  {
    path: "/login",
    component: login,
  },
];

export default new VueRouter({ routes });