<script setup lang="ts">
import MockButton from '@/components/mock/sfc/MockButton.vue';
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';

import { computed } from 'vue';
const store_ = useVisualizerStore();

const playButtonText = computed(() => store_.isPlaying ? "Pause" : "Play");
function togglePlay() {
  if (store_.isPlaying) {
    store_.pause();
  }
  else {
    store_.play();
  }
}

function jumpToStart() {

}
</script>

<template>
  <div class="visualizer-navigation mock">
    <MockButton :text="playButtonText" @click="togglePlay()" />

    <MockButton text="Start" />
    <MockButton text="Left" />
    <MockButton text="Right" />
    <MockButton text="End" />
  </div>
</template>

<style scoped>
.visualizer-navigation {
  display: flex;
  align-items: stretch;
  min-height: 50px;

}

.visualizer-navigation>* {
  flex: 1;
}
</style>
