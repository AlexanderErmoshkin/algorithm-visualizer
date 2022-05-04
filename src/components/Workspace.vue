<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/stores";
import { defineAsyncComponent } from "vue";
import Log from "./Log.vue";
import ToolBar from "./ToolBar.vue";
import ControlPanel from "./ControlPanel.vue";
import Ticker from "./Ticker.vue";

const store = useStore();
const AlgorithmComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      if (!store.chosenAlgorithm)
        return reject("state.chosenAlgorithm is null.");

      resolve(
        import(
          "./algorithms/" + store.chosenAlgorithm.constructor.name + ".vue"
        )
      );
    })
);
const step = computed(() => store.currentStep);
</script>

<template>
  <Suspense v-if="store.chosenAlgorithm">
    <template #default>
      <section class="workspace">
        <h1 class="workspace__header">{{ store.chosenAlgorithm.name }}</h1>
        <Ticker>
          <AlgorithmComponent
            :array="store.values"
            :max-value="store.maxValue"
            :step="step"
          />
          <ControlPanel />
          <p class="workspace__last-log">{{ step.log }}</p>
          <ToolBar />
          <Log />
        </Ticker>
      </section>
    </template>
    <template #fallback> ...Loading </template>
  </Suspense>
</template>

<style lang="scss">
@import "../assets/mixins.scss";

.workspace {
  display: grid;
  grid-template-areas:
    "header"
    "data"
    "view"
    "lastlog"
    "tools"
    "logs";
  padding: 0.5rem;
}

.workspace__header {
  grid-area: header;
  text-align: center;
  margin: 0;
  margin-bottom: 1.5rem;
  padding: 0;
}

.view {
  grid-area: view;
}

.data-controls {
  grid-area: data;
}

.workspace__last-log {
  grid-area: lastlog;
  @include align-center-flex;
  @include hor-margin-lg;
  text-align: center;
  min-height: 30px;
  background-color: var(--vt-c-pink);
  border-top: 1px solid var(--vt-c-cream);
  border-bottom: 1px solid var(--vt-c-cream);
}

.toolbar {
  grid-area: tools;
}

.logs {
  grid-area: logs;
}

@media (min-width: 641px) {
  .workspace {
    grid-template-columns: 3fr 1fr;
    grid-template-areas:
      "header ."
      "view data"
      "lastlog ."
      "tools ."
      "logs .";
  }
}
</style>
