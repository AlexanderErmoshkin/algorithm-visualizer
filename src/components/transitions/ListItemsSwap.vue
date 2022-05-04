<template>
  <TransitionGroup tag="ul" name="list">
    <slot />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}

.list-move {
  opacity: 1;
}
</style>
