<script setup lang="ts">
import useVisualizerStore from "@/stores/visualizer/visualizer-store.ts";
import { testPost } from "@/common/connector";
const { play } = useVisualizerStore();
function click() {
  console.log("Playing!");
  testPost();
  play();
}
</script>

<template>
  <icon-button class="play-button" text="Play" icon="feather-play" :iconSize="15" @click="click">
  </icon-button>
</template>

<style scoped></style>
