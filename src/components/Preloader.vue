<template>
  <div class="spinner" v-show="loading">
    <bounce-loader :loading="loading" :color="'#2468b1'"></bounce-loader>
  </div>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader";

export default {
  components: {
    BounceLoader,
  },

  props: {
    loading: {
      type: Boolean,
    },
  },

  computed: {
    isLoading() {
      return this.loading;
    },
  },
};
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}
</style>
