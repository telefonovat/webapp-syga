<script setup lang="ts">
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { storeToRefs } from 'pinia';

import { computed } from 'vue';
const store = useVisualizerStore();

const numberOfFrames = computed(() => store.numberOfFrames);

const { activeFrameNumber } = storeToRefs(store);

const isPlaying = computed(() => store.isPlaying);
function togglePlay() {
  if (isPlaying.value) {
    store.pause();
  } else {
    store.play();
  }
}

function jumpToStart() {
  store.setActiveFrame(0);
}

function jumpToEnd() {
  store.setActiveFrame(numberOfFrames.value - 1);
}

function prevFrame() {
  store.setActiveFrame(activeFrameNumber.value - 1);
}

function nextFrame() {
  store.setActiveFrame(activeFrameNumber.value + 1);
}
</script>

<template>
  <v-btn
    title="Play/Pause"
    :variant="isPlaying ? 'tonal' : 'elevated'"
    @click="togglePlay()"
  >
    <v-icon icon="mdi-play-pause" />
  </v-btn>
  <v-btn title="Start" @click="jumpToStart()">
    <v-icon icon="mdi-chevron-double-left" />
  </v-btn>
  <v-btn title="Left" @click="prevFrame()">
    <v-icon icon="mdi-chevron-left" />
  </v-btn>
  <v-card-item>
    {{ activeFrameNumber + 1 }}
  </v-card-item>
  <v-container>
    <v-slider
      v-model="activeFrameNumber"
      min-width="150"
      max-width="300"
      min="0"
      :max="numberOfFrames - 1"
      step="1"
      :disabled="numberOfFrames === 0"
    ></v-slider>
  </v-container>
  <v-btn title="Right" @click="nextFrame()">
    <v-icon icon="mdi-chevron-right" />
  </v-btn>
  <v-btn title="End" @click="jumpToEnd()">
    <v-icon icon="mdi-chevron-double-right" />
  </v-btn>
</template>

<style scoped></style>
