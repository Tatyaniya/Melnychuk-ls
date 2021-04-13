import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import header from "./components/header";
import about from "./pages/about";
import works from "./pages/works";
import reviews from "./pages/reviews";
import login from "./pages/login";
import store from "./store";
import $axios from "./requests";

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
    meta: {
        public: true
    }
  },
];

const router = new VueRouter({ routes });

router.beforeEach(async (to, from, next) => {
    // роут публичный, если в meta есть свойство public
    const isPublicRoute = to.matched.some(record => record.meta.public);
    const isUserLogged = store.getters["user/userIsLogged"];

    if (!isUserLogged) {
        const token = localStorage.getItem('token');

        if (!token && isPublicRoute) {
            next();
        } else if (token) {
            $axios.defaults.headers['Authorization'] = `Bearer ${ token }`;
        
            try {
                const response = await $axios.get('/user');

                store.commit("user/SET_USER", response.user.user);

                (from.path === "/login") ? next() : next({ path: from.path });
            } catch (e) {
                
                localStorage.removeItem('token');

                next('/login');
            }
        } else {
            next('/login');
        }
    } else if (isPublicRoute && isUserLogged) {
        next({ path: from.path });
    } else {
        next();
    }
});

export default router;