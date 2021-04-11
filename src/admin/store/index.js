import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './modules/user';
import categories from './modules/categories';
import skills from './modules/skills';

export default new Vuex.Store({
    modules: {
        user,
        categories,
        skills
    }
});