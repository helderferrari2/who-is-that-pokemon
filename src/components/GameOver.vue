<template>
  <div class="container pt-5">
    <div class="row align-items-center h-100">
      <div class="col-6 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title py-2 text-center">Game Over</h1>
            <table class="table table-borderless my-3 ml-5">
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
                  <th class="pl-0 w-25" scope="row">Failed:</th>
                  <td>{{ failed }}</td>
                </tr>
              </tbody>
            </table>

            <div class="d-flex justify-content-center">
              <a href="/" class="btn btn-primary">Try Again</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    playerName() {
      return this.$store.state.quiz.playerName;
    },

    score() {
      return this.$store.state.quiz.score;
    },

    failed() {
      return this.$store.getters.failedMoves;
    },
  },
};
</script>