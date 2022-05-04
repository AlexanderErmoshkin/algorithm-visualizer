<script setup lang="ts">
import { onUpdated, ref } from "vue";
import { useStore } from "@/stores";

const store = useStore();

const logsWrapper = ref(null);
onUpdated(() => {
  const element = logsWrapper.value as unknown as HTMLDivElement;
  element.scroll({ top: element.scrollHeight });
});
</script>

<template>
  <div class="logs" ref="logsWrapper">
    <ol class="logs__list">
      <li
        v-for="(log, index) in store.logs"
        :key="index"
        class="logs__list-item"
      >
        {{ log }}
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.logs {
  @include hor-margin-lg;
  background-color: var(--vt-c-green);
  border-radius: 1rem;
  height: 15rem;
  padding: 1rem 0;
  overflow-y: scroll;
}

.logs__list {
  margin: 0;
}

.logs__list-item {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--vt-c-cream);
}
</style>
