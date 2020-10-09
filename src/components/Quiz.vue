<template>
  <div class="container mt-3">
    <div class="widget">
      <div class="widget-img">
        <img :src="item.image" alt="who" />
      </div>
      <div class="widget-content">
        <div class="quiz">
          <!-- :class="{ active: i === activeItem}" -->
          <div
            class="quiz-item"
            v-for="item in options"
            :key="item"
            @click.prevent="validateMove(item)"
            :class="{ 'quiz-item-success': item == selected }"
          >
            {{ item }}
          </div>
        </div>
      </div>
      {{ isCorrect }}
      {{ current }}
    </div>
  </div>
</template>


<script>
import * as pokemon from "@/services/pokemon.service";

export default {
  data() {
    return {
      item: {},
      current: "",
      options: [],
      selected: "",
      isCorrect: false,
    };
  },

  created() {
    this.startGame();
  },

  methods: {
    startGame() {
      let randomPokemonsId = pokemon.getRandomPokemons();
      this.setCurrentPokemon(randomPokemonsId[0]);
      this.getPokemonById(this.current);
      this.options = pokemon.getRandomPokemonList(this.item.name);
    },

    setCurrentPokemon(id) {
      this.current = id;
    },

    getPokemonById(id) {
      this.item = pokemon.getPokemonById(id);
    },

    validateMove(item) {
      this.isCorrect = pokemon.validateMove(item, this.item.name);
      this.item.name;

      //   if (this.isCorrect) this.selected = item;
    },
  },
};
</script>