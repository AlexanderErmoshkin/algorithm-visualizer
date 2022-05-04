<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "@/stores";

const store = useStore();
const speed = computed(() => store.speed);
const isPlaying = computed(() => store.isPlaying);

watch(isPlaying, (newValue) => {
  if (newValue) {
    let timer = setInterval(() => {
      if (!isPlaying.value) {
        clearTimeout(timer);
        return;
      }

      store.incrementPosition();
    }, speed.value);
  }
});
</script>

<template>
  <slot />
</template>
