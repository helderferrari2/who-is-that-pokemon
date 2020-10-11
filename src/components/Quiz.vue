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
        <transition name="fade">
          <div v-if="allDataIsReady">
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
                @click.once="validateMove(item.id)"
                :class="{
                  'quiz-item-success':
                    item.id == currentPokemon.id && showCorrectAnswer,
                }"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </transition>
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
      allDataIsReady: false,
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
      setTimeout(() => {
        this.currentPokemon = pokemon.getPokemonById(
          this.randomPokemonsId[this.progress]
        );
        this.randomPokemonsList = pokemon.getRandomPokemonList(
          this.currentPokemon
        );
        this.$store.dispatch("increaseProgress", this.progress + 1);
        this.allDataIsReady = true;
      }, 1000);
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
      setTimeout(() => {
        if (this.progress === this.totalMoves) {
          this.$router.push({ name: "game-over" });
        } else {
          this.resetQuestion();
          this.startGame();
        }
      }, 2000);
    },

    resetQuestion() {
      this.hidePokemon = true;
      this.showCorrectAnswer = false;
      this.currentPokemon = {};
      this.randomPokemonsList = [];
      this.allDataIsReady = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
