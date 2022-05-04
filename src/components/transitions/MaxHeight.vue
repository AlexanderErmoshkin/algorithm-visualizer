<script setup lang="ts">
const onEnter = (el: HTMLElement) => {
  el.style.maxHeight = el.scrollHeight + "px";
};

const onLeave = (el: HTMLElement) => {
  el.style.maxHeight = "0";
};
</script>

<template>
  <Transition @enter="onEnter" @leave="onLeave">
    <slot />
  </Transition>
</template>

<style>
.max-height-transition {
  transition: max-height 0.35s ease;
}
</style>
