<script setup lang="ts">
defineProps<{
  caption: string;
  bgColor: string;
}>();

defineEmits(["click"]);
</script>

<template>
  <a
    href="#"
    :style="{ 'background-color': bgColor }"
    class="button"
    @click.stop="$emit('click')"
  >
    {{ caption }}
  </a>
</template>

<style lang="scss" scoped>
.button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
  font-weight: 300;
  color: #fff;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 1);
  }

  @media (max-width: 640px) {
    display: block;
    margin: 0.2em auto;
  }
}
</style>
