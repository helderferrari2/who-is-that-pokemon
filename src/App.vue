<template>
  <div id="app">
    <header-component></header-component>

    <quiz-component></quiz-component>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import QuizComponent from "@/components/Quiz";

export default {
  components: {
    HeaderComponent,
    QuizComponent,
  },
};
</script>
