<script setup lang="ts">
import ComponentRenderer from './graph/ComponentRenderer.vue';
</script>
<template>
  <div class="visualizer mock">
    <ComponentRenderer :componentIndex="0" />
  </div>
</template>

<style scoped>
.visualizer{
  width: 100%;
}
</style>
