<script setup lang="ts">
import { useStore } from "@/stores";
import Button from "./UI/Button.vue";

const store = useStore();
</script>

<template>
  <div class="data-controls">
    <Button
      caption="Random"
      bg-color="#429E9D"
      @click="store.generateRandomArray"
      style="margin-bottom: 1rem"
    />
    <Button
      caption="Sort"
      bg-color="rgb(241 146 78 / 95%)"
      @click="store.executeAlgorithm"
    />
  </div>
</template>

<style scoped lang="scss">
.data-controls {
  grid-area: data;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 641px) {
    margin-right: 3rem;
  }
}
</style>
