<script setup lang="ts">
import GraphVisualizer from '../visualizer/GraphVisualizer.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import PlayButton from "@/components/buttons/PlayButton.vue";
import Split from '@/utils/Split.vue';
import Test from '@/components/test/Test.vue';

const iconSize = 15;
</script>

<template>
  <div>

    <div style="display:flex">
      <icon-button icon="feather-play" :iconSize="iconSize" />
      <icon-button icon="feather-play" :iconSize="iconSize" />
      <icon-button icon="feather-play" :iconSize="iconSize" />
    </div>
    <split :initialSizes="[50, 50]" direction="vertical">
      <graph-visualizer />
      <test />
    </split>
  </div>
</template>

<style scoped></style>
