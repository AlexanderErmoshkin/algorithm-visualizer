<script setup lang="ts">
import { useStore } from "@/stores";
import NavItems from "./NavItems.vue";
import MobileMenu from "./MobileMenu.vue";

const store = useStore();
</script>

<template>
  <nav class="navigation">
    <span
      :class="{ algorithms__item_active: !store.chosenAlgorithm }"
      class="algorithms__item"
      @click="store.unsetChosenAlgorithm()"
    >
      Home
    </span>
    <NavItems class="algorithms_desktop" />
    <MobileMenu>
      <NavItems />
    </MobileMenu>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  background-color: var(--vt-c-black);
  color: var(--vt-c-white-soft);
  margin-bottom: var(--grid-gap);
}

@media (max-width: 640px) {
  .algorithms_desktop {
    display: none;
  }
}
</style>

<style lang="scss">
.algorithms {
  list-style: none;
  margin: 0;
  padding: 0;
}

.algorithms__item {
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--vt-c-black-mute);
  }
}

.algorithms__item_active {
  font-weight: bold;
}
</style>
