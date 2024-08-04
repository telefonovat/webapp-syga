<script setup lang="ts">
/*
 * TODO:
*       > Slot validation
*/
import { ref, onMounted, useSlots, nextTick } from 'vue';
import Panzoom from "@panzoom/panzoom";

const panzoomElement = ref<HTMLDivElement | null>(null);
const visualizer = ref<HTMLDivElement | null>(null);
const slots = useSlots();


onMounted(() => {
  nextTick(() => {
    if (visualizer.value) {
      const instance = Panzoom(visualizer.value, {
        startScale: 0.5,
        minScale: 0.5,
        maxScale: 5,
        contain: "outside"
      });
      visualizer.value.addEventListener("wheel", instance.zoomWithWheel);
    }
  });
});

</script>

<template>
  <div ref="panzoomElement" class="zoom-container">
    <div ref="visualizer" class="visualizer-box">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.zoom-container {
  border-style: solid;
  border-color: black;
}
</style>
