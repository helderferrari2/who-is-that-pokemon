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
    let array = getPokemonRandomNames(current);
    return shufflePokemonList(array);
}

export const getPokemonRandomNames = (current) => {

    let data = []
    data.push(current) //append current pokemon to list

    let randomPokemonsId = getRandomPokemons();//get 5 random pokemons id
    let randomPokemons = randomPokemonsId.map(item => getPokemonById(item)) // get pokemon object from random list

    let limit = 4;
    let count = 1;
    randomPokemons.forEach(item => {
        if (item.id != current.id && count < limit) {
            data.push(item)
        }
        count++;
    })
    return data;
}

export const shufflePokemonList = (array) => array.sort(() => Math.random() - 0.5)

export const validateMove = (current, selected) => current === selected
