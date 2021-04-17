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

        console.warn('[строка 64] isUserLogged is false');

        if (!token && isPublicRoute) {
            console.warn('[строка 67] I\'is public route and the token was not found in localStorage');
            next();
        } else if (token) {
            console.warn('[строка 70] token found in localStorage');

            $axios.defaults.headers['Authorization'] = `Bearer ${ token }`;
        
            try {
                const response = await $axios.get('/user');

                store.commit("user/SET_USER", response.data.user);

                console.warn('[строка 79] The user\'s object was successfully fetched', from.path);

                next();

                (from.path === "/login") ? next() : next({ path: from.path });
            } catch (e) {
                console.warn('[строка 85] The user\'s object was not fetched');

                next();
                
                localStorage.removeItem('token');

                next('/login');
            }
        } else {
            console.warn('[строка 92] token was not found in localStorage');
            next('/login');
        }
    } else if (isPublicRoute && isUserLogged) {
        next({ path: from.path });
    } else {
        next();
    }
});

export default router;