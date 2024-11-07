<script setup lang="ts">
import MockButton from '@/components/mock/sfc/MockButton.vue';

import { buildCode } from '@/api/connector';

import { useEditorStore } from '@/store/editor/editorStore';
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { storeToRefs } from 'pinia';

import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';
import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';

const editorStore = useEditorStore();
const visualizerStore = useVisualizerStore();
const { code } = storeToRefs(editorStore);
function build() {
  const visualizationRequest: VisualizationRequest = {
    code: code.value,
  };
  buildCode(visualizationRequest)
    .then((visualizationResult: VisualizationResult) => {
      visualizerStore.setFrames(visualizationResult.frames);
      console.log(visualizationResult.frames);
    })
    .catch((error) => {
      console.warn(error);
    });
}
</script>

<template>
  <div class="navigation-header mock">
    <MockButton text="Build" @click="build()" />
  </div>
</template>

<style scoped></style>
