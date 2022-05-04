<script setup lang="ts">
import { defineProps } from "vue";
import type { NumberArray, Step } from "../../stores";
import ListItemsSwapTransition from "../transitions/ListItemsSwap.vue";

defineProps<{
  step: Step;
  array: NumberArray;
  maxValue: number;
}>();

/** max list item height is 150px */
const maxPxHeight = 150;
/** min list item is at least 20% high */
const minPxHeight = maxPxHeight * 0.2;
</script>

<template>
  <section class="view">
    <ListItemsSwapTransition class="sort-list">
      <li
        v-for="(num, index) in array"
        :key="index"
        class="sort-list__item"
        :class="{
          'sort-list__item_highlighted':
            step.highlighted && step.highlighted.includes(index),
          'sort-list__item_processed':
            'lastUnsortedIndex' in step && step.lastUnsortedIndex < index,
        }"
        :style="{
          height:
            minPxHeight + (num * (maxPxHeight - minPxHeight)) / maxValue + 'px',
        }"
      >
        {{ num }}
      </li>
    </ListItemsSwapTransition>
  </section>
</template>

<style lang="scss" scoped>
@import "../../assets/mixins.scss";

.view {
  height: 200px;
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: var(--vt-c-pink);

  @include hor-margin-lg;
}

.sort-list {
  @include list-reset;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1vmax;
}

.sort-list__item {
  display: flex;
  flex-flow: column-reverse;
  min-width: 5%;
  background-color: var(--color-list-items);
  padding-left: 1px;
  padding-right: 1px;
  border: 1px solid #000;
  text-align: center;

  transition: all 0.5s;
}

.sort-list__item_highlighted {
  background-color: var(--color-list-items-active);
}

.sort-list__item_processed {
  background-color: var(--color-list-items-processed);
}
</style>
