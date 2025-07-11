<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err;

  return false;
});
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <slot v-else></slot>
</template>

<style scoped></style>
