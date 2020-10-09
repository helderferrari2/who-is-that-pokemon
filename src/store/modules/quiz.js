export default {
    state: {
        player: "",
        score: 0,
        totalMoves: 5
    },

    mutations: {
        SET_USER(state, payload) {
            state.user = payload;
        }
    },

    getters: {},

    actions: {
        // getClassicPokemons(context) {
        //     return new Promise((resolve, reject) => {
        //         return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        //             .then(() => resolve())
        //             .catch(error => reject(handleErrorResponse(error)));
        //     });
        // },

        // https://pokeres.bastionbot.org/images/pokemon/152.png

        // getPokemonById(context, id) {
        //     return new Promise((resolve, reject) => {
        //         return axios.get();
        //             .then(() => resolve())
        //             .catch(error => reject(handleErrorResponse(error)));
        //     });
        // },
    }
};
