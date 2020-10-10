export default {
    state: {
        playerName: "",
        score: 0,
        progress: 0,
        totalMoves: 5,
    },

    mutations: {
        SET_PLAYER_NAME(state, payload) {
            state.playerName = payload;
        },

        SET_SCORE(state, payload) {
            state.score = payload;
        },

        SET_PROGRESS(state, payload) {
            state.progress = payload;
        }
    },

    getters: {
        failedMoves: (state) => {
            let failed = state.totalMoves - state.score;
            return failed > 0 ? failed : 0;
        }
    },

    actions: {

        setPlayerName(context, playerName) {
            context.commit("SET_PLAYER_NAME", playerName);
        },

        increaseScore(context, payload) {
            context.commit("SET_SCORE", payload);
        },

        increaseProgress(context, payload) {
            context.commit("SET_PROGRESS", payload);
        }
    }
};
