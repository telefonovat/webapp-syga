<script setup lang="ts">
  interface Props {
    name: string;
  }
  defineProps<Props>();
</script>

<template>

  <button>{{ name }} </button>

</template>

<style scoped></style>

