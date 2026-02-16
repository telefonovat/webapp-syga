<template>

  <div v-if="error">Error: {{ error.message }},{{ error.stack }}</div>

  <slot v-else></slot>

</template>

<script setup lang="ts">
  import { onErrorCaptured, ref } from "vue";

  const error = ref<Error | null>(null);

  onErrorCaptured((err) => {
    error.value = err;

    return false;
  });
</script>

<style scoped></style>

