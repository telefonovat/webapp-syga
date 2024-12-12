<script setup lang="ts">
import { computed } from 'vue';
const username = computed(
  () => localStorage.getItem('username') || 'null'
);
</script>

<template>
  <div class="user-profile">
    <h1>Welcome {{ username }}</h1>
  </div>
</template>

<style scoped></style>
