import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './modules/user';
import categories from './modules/categories';
import skills from './modules/skills';
import reviews from './modules/reviews';
import tooltips from './modules/tooltips';

export default new Vuex.Store({
    modules: {
        user,
        categories,
        skills,
        reviews,
        tooltips
    }
});