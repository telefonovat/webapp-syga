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
  background-color: #282c34;
  width: 100%;
  height:100%; 

}
</style>
