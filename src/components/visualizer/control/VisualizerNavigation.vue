<script setup lang="ts">
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';

import { computed } from 'vue';
const store_ = useVisualizerStore();

const numberOfFrames = computed(() => store_.numberOfFrames);
const activeFrameNumber = computed(() => store_.activeFrameNumber);

const playButtonText = computed(() =>
  store_.isPlaying ? 'Pause' : 'Play'
);
function togglePlay() {
  if (store_.isPlaying) {
    store_.pause();
  } else {
    store_.play();
  }
}

function jumpToStart() {
  store_.setActiveFrame(0);
}

function jumpToEnd() {
  store_.setActiveFrame(numberOfFrames.value - 1);
}

function prevFrame() {
  store_.setActiveFrame(activeFrameNumber.value - 1);
}

function nextFrame() {
  store_.setActiveFrame(activeFrameNumber.value + 1);
}
</script>

<template>
  <div class="navigation-header mock">
    <v-btn :text="playButtonText" @click="togglePlay()" />
    <v-btn text="Start" @click="jumpToStart()" />
    <v-btn text="Left" @click="prevFrame()" />
    <v-btn text="Right" @click="nextFrame()" />
    <v-btn text="End" @click="jumpToEnd()" />
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
