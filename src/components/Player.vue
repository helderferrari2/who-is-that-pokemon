<template>
  <div class="container pt-5">
    <div class="row align-items-center h-100">
      <div class="col-6 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title py-2 text-center">Player Info</h1>
            <form @submit.prevent="setPlayerName">
              <div class="form-group">
                <label for="exampleFormControlInput1">Player Name:</label>
                <input type="text" class="form-control" v-model="playerName" />
              </div>

              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-warning mb-2">
                  guest
                </button>

                <button type="submit" class="btn btn-primary mb-2">
                  Start
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
    };
  },

  methods: {
    setPlayerName() {
      this.$store.dispatch("setPlayerName", this.playerName);
      this.$router.push({ name: "quiz" });
    },
  },
};
</script>