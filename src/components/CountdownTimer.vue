<template>
  <div class="countdown" v-show="countDown > 0">
    {{ countDown }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDown: 3,
    };
  },

  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },
  created() {
    this.countDownTimer();
  },
};
</script>


<style scoped>
.countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2468b1;
  background: #fccf00;
  height: 260px;
  font-size: 2em;
}
</style>