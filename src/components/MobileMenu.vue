<script setup lang="ts">
import { useStore } from "@/stores";
import MaxHeightTransition from "./transitions/MaxHeight.vue";

const store = useStore();
</script>

<template>
  <a href="#" class="navbar-toggle-icon" @click.stop="store.toggleMobileMenu">
    <span></span>
  </a>
  <MaxHeightTransition>
    <div
      class="navbar-collapse max-height-transition"
      v-show="store.isMobileMenuOpened"
    >
      <slot />
    </div>
  </MaxHeightTransition>
</template>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.navbar-toggle-icon {
  padding: 1rem;

  > span {
    @include toggle-icon-line;
    left: calc($line-width / 2);

    &::before,
    &::after {
      @include toggle-icon-line;
      content: "";
      left: 0;
    }

    &::before {
      top: -5px;
    }

    &::after {
      top: 5px;
    }
  }
}

.navbar-collapse {
  flex-basis: 100%;
}

@media screen and (min-width: 641px) {
  .navbar-toggle-icon,
  .navbar-collapse {
    display: none;
  }
}
</style>
