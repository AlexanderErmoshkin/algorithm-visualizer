<script setup lang="ts">
import { useStore } from "@/stores";

const store = useStore();
</script>

<template>
  <div class="toolbar">
    <a href="#" @click.stop="store.decrementPosition"
      ><img width="25" height="25" src="../assets/img/back.png" alt="back"
    /></a>
    <a v-show="!store.isPlaying" href="#" @click.stop="store.play"
      ><img width="25" height="25" src="../assets/img/play.png" alt="play"
    /></a>
    <a v-show="store.isPlaying" href="#" @click.stop="store.pause"
      ><img width="25" height="25" src="../assets/img/pause.png" alt="pause"
    /></a>
    <a href="#" @click.stop="store.incrementPosition"
      ><img width="25" height="25" src="../assets/img/next.png" alt="next"
    /></a>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/mixins.scss";

.toolbar {
  @include align-center-flex;
  @include hor-margin-lg;
  gap: 1rem;
  padding: 0.2rem;
  margin-bottom: 2rem;
  background-color: var(--vt-c-pink);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  a {
    @include align-center-flex;
  }
}
</style>
