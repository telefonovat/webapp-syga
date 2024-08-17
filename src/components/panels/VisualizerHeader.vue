<script setup lang="ts">
import { computed } from "vue";
import { useVisualizerControl } from "./visualizer-control";
import { watch } from "vue";
const { isPlaying, togglePlay } = useVisualizerControl();

const playButtonIcon = computed(() => isPlaying.value ? "feather-alert-triangle" : "feather-play");
const playButtonText = computed(() => isPlaying.value ? "Pause" : "Play");

watch(playButtonIcon, (_new, _old) => {
  console.log("Changed");
})
</script>

<template>
  <div class="visualizer-header">
    <icon-button :icon="playButtonIcon" @click="togglePlay()">{{ playButtonText }}</icon-button>

  </div>
</template>

<style scoped></style>
