<script setup lang="ts">
import Icon from "./Icon.vue";
interface Props {
  size?: number,
  icon?: string,
}
const props = withDefaults(defineProps<Props>(), {
  size: 24,

})
</script>

<template>
  <button>
    <icon :icon="icon" :size="size" /><br />
    <slot />
  </button>
</template>

<style scoped></style>
