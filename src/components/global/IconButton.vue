<script setup lang="ts">
import Icon from "./Icon.vue";
interface Props {
  size?: number,
}
withDefaults(defineProps<Props>(), {
  size: 24,
})
</script>

<template>
  <button>
    <icon /><br />
    <slot />
  </button>
</template>

<style scoped></style>
