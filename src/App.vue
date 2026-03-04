<script setup lang="ts">
  import ErrorBoundary from "@/components/error/ErrorBoundary.vue";
  import Snack from "./components/utility/snack/Snack.vue";
</script>

<template>

  <ErrorBoundary />

  <Snack />

  <RouterView />

</template>

<style scoped>

</style>

