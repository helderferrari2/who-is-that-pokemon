import Vue from "vue";
import Vuex from "vuex";
import quiz from "@/store/modules/quiz";


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        quiz
    }
});

export default store;