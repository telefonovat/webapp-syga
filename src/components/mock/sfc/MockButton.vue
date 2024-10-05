<script setup lang="ts">

interface Props {
  text: string
}

defineProps<Props>();
</script>

<template>
  <button>{{ text }}</button>
</template>

<style scoped></style>
