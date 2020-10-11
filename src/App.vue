<template>
  <div id="app">
    <header-component></header-component>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";

export default {
  components: {
    HeaderComponent,
  },
};
</script>

<style>
#app {
  font-family: "pokemon", Helvetica;
}

@font-face {
  font-family: "pokemon";
  src: local("pokemon"), local("pokemon-solid"),
    url("./assets/fonts/pokemon/pokemon-solid.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
</style>
