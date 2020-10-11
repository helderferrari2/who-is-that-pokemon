import Vue from "vue";
import VueRouter from "vue-router";
import Player from "@/components/Player"
import Quiz from "@/components/Quiz"
import GameOver from "@/components/GameOver"


const routes = [
    {
        path: "/",
        name: "start",
        component: Player
    },
    {
        path: "/quiz",
        name: "quiz",
        component: Quiz
    },
    {
        path: "/game-over",
        name: "game-over",
        component: GameOver,
    }
]


//ROUTES
Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes
});

export default router;