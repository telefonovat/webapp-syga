<script setup lang="ts">
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';

import { computed } from 'vue';
const store_ = useVisualizerStore();

const numberOfFrames = computed(() => store_.numberOfFrames);
const activeFrameNumber = computed(() => store_.activeFrameNumber);

const isPlaying = computed(() => store_.isPlaying);
function togglePlay() {
  if (isPlaying.value) {
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
  <v-toolbar-items>
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
    <v-btn title="Right" @click="nextFrame()">
      <v-icon icon="mdi-chevron-right" />
    </v-btn>
    <v-btn title="End" @click="jumpToEnd()">
      <v-icon icon="mdi-chevron-double-right" />
    </v-btn>
  </v-toolbar-items>
</template>

<style scoped></style>
