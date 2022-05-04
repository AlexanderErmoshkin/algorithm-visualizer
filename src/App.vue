<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import Workspace from "./components/Workspace.vue";
</script>

<template>
  <header>
    <Navigation />
  </header>

  <main>
    <Workspace />
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  margin: 0 auto;
}

main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
