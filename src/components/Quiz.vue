<template>
  <div class="container mt-3">
    <div class="row">
      <!--Left-->
      <div class="col-md-4">
        <h1>Game Info</h1>
        <table class="table table-borderless my-3">
          <tbody>
            <tr>
              <th class="pl-0 w-25" scope="row">Player:</th>
              <td>{{ playerName || "Guest" }}</td>
            </tr>
            <tr>
              <th class="pl-0 w-25" scope="row">Score:</th>
              <td>{{ score }}</td>
            </tr>
            <tr>
              <th class="pl-0 w-25" scope="row">Progress:</th>
              <td>{{ progress }} / {{ totalMoves }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--Right-->
      <div class="col-md-8">
        <div id="counter">
          <img
            src="@/assets/images/background.png"
            alt="bg"
            class="img-responsive"
          />
          <img
            :src="currentPokemon.image"
            alt="pokemon"
            id="over"
            :class="{ 'img-responsive': true, 'hide-pokemon': hidePokemon }"
          />
        </div>
        <div class="quiz">
          <div
            class="quiz-item"
            v-for="item in randomPokemonsList"
            :key="item.id"
            @click.prevent="validateMove(item.id)"
            :class="{
              'quiz-item-success':
                item.id == currentPokemon.id && showCorrectAnswer,
            }"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as pokemon from "@/services/pokemon.service";

export default {
  data() {
    return {
      currentPokemon: {},
      randomPokemonsId: [],
      randomPokemonsList: [],
      hidePokemon: true,
      showCorrectAnswer: false,
    };
  },

  created() {
    this.prepareQuiz();
    this.startGame();
  },

  computed: {
    playerName() {
      return this.$store.state.quiz.playerName;
    },

    score() {
      return this.$store.state.quiz.score;
    },

    progress() {
      return this.$store.state.quiz.progress;
    },

    totalMoves() {
      return this.$store.state.quiz.totalMoves;
    },
  },

  methods: {
    prepareQuiz() {
      this.randomPokemonsId = pokemon.getRandomPokemons();
    },

    startGame() {
      this.currentPokemon = pokemon.getPokemonById(
        this.randomPokemonsId[this.progress]
      );
      this.randomPokemonsList = pokemon.getRandomPokemonList(
        this.currentPokemon
      );
      this.$store.dispatch("increaseProgress", this.progress + 1);
    },

    validateMove(id) {
      let isCorrect = pokemon.validateMove(this.currentPokemon.id, id);
      this.hidePokemon = false;
      this.showCorrectAnswer = true;

      if (isCorrect) {
        this.$store.dispatch("increaseScore", this.score + 1);
      }
      this.nextQuiz();
    },

    nextQuiz() {
      if (this.progress === this.totalMoves) {
        this.$router.push({ name: "game-over" });
      } else {
        setTimeout(() => {
          this.hidePokemon = true;
          this.showCorrectAnswer = false;
          this.startGame();
        }, 2000);
      }
    },
  },
};
</script>
