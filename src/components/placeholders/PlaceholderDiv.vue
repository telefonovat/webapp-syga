<script setup lang="ts">
import { ref } from 'vue';


const count = ref(0);
</script>

<template>
  <div class="placeholder">
    <h1>This is a placeholder</h1>
    <span>{{ count }}</span><br />
    <button @click="count++" />
  </div>
</template>

<style scoped>
.placeholder {
  background-color: black;
  text-align: center;
}
</style>
