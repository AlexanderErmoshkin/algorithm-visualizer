<script setup lang="ts">
import { useStore } from "@/stores";

const store = useStore();
</script>

<template>
  <ul class="algorithms">
    <li
      v-for="type of store.options"
      :key="type.id"
      :class="{ algorithms__item_active: store.isChosen(type.id) }"
      @click="store.setChosenAlgorithm(type.id)"
      class="algorithms__item"
    >
      {{ type.name }}
    </li>
  </ul>
</template>
