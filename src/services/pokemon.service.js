export const getRandomInt = () => {
    let min = 1
    let max = 151
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

import store from "@/store/store"
export const getRandomPokemons = () => {
    let max = 151
    const nums = new Set();
    while (nums.size !== store.state.quiz.totalMoves) {
        nums.add(Math.floor(Math.random() * max) + 1);
    }
    return [...nums]
}

import pokemons from "@/services/data.json";
export const getPokemonById = (id) => {
    let item = pokemons.items.filter(item => item.id == id);
    return item[0];
}

export const getRandomPokemonList = (current) => {
    let list = getPokemonRandomNames();
    let array = appendCurrentPokemonNameToRandomList(current, list);
    return sufflePokemonRandomNames(array);
}

export const getPokemonRandomNames = () => {
    let names = pokemons.items.map(item => item.name);
    let data = []

    for (let i = 0; i < 3; i++) {
        let pokemonName = names[Math.floor(Math.random() * names.length)];
        data.push(pokemonName)
    }
    return data;
}


export const appendCurrentPokemonNameToRandomList = (name, array) => {
    array.push(name)
    return array;
}


export const sufflePokemonRandomNames = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export const validateMove = (name, valid) => {
    return name === valid
}




