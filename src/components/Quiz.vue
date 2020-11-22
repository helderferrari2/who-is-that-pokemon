<template>
  <div class="container mt-3">
    <div class="row">
      <!--Left-->
      <div class="col-md-4">
        <div class="score">
          <h1>Game Info</h1>
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th class="pl-0 w-50" scope="row">Player:</th>
                <td>{{ playerName || "Guest" }}</td>
              </tr>
              <tr>
                <th class="pl-0 w-50" scope="row">Score:</th>
                <td>{{ score }}</td>
              </tr>
              <tr>
                <th class="pl-0 w-50" scope="row">Progress:</th>
                <td>{{ progress }} / {{ totalMoves }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--Right-->
      <div class="col-md-8">
        <transition name="fade">
          <div v-if="allDataIsReady">
            <div id="counter">
              <img
                src="@/assets/images/background-min.png"
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

            <div
              :class="{ quiz: true, disableQuiz: disableQuiz }"
              v-on:click.stop
            >
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
          <div v-else>
            <preloader :loading="true" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import * as pokemon from "@/services/pokemon.service";
import Preloader from "./Preloader";

export default {
  components: {
    Preloader,
  },
  data() {
    return {
      currentPokemon: {},
      randomPokemonsId: [],
      randomPokemonsList: [],
      hidePokemon: true,
      showCorrectAnswer: false,
      allDataIsReady: false,
      loading: false,
      disableQuiz: false,
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
        this.disableQuiz = false;
      }, 1000);
    },

    validateMove(id) {
      this.disableQuiz = true;
      let isCorrect = pokemon.validateMove(this.currentPokemon.id, id);
      this.hidePokemon = false;
      this.showCorrectAnswer = true;

      if (isCorrect) {
        this.$store.dispatch("increaseScore", this.score + 1);
      }
      return this.nextQuiz();
    },

    nextQuiz() {
      setTimeout(() => {
        if (this.progress === this.totalMoves) {
          this.$router.push({ name: "game-over" });
        } else {
          this.resetQuestion();
          this.startGame();
        }
      }, 3000);
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
