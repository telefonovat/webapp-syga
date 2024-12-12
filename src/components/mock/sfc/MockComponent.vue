<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="mock">
    <h1>{{ text }}</h1>
  </div>
</template>

<style scoped></style>
