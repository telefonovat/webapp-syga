<script setup lang="ts">
  import ErrorBoundary from "@/components/ErrorBoundary.vue";
  import { useSyncFontSize } from "./useSyncFontSize";

  useSyncFontSize();
</script>

<template>

  <ErrorBoundary>

    <RouterView />

  </ErrorBoundary>

</template>

<style scoped>

</style>

