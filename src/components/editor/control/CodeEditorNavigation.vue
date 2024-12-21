<script setup lang="ts">
import SaveAlgorithmPopup from './SaveAlgorithmPopup.vue';
import { buildCode } from '@/api/connector';

import { useEditorStore } from '@/store/editor/editorStore';
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { storeToRefs } from 'pinia';

import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';
import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';
import { ref } from 'vue';

const editorStore = useEditorStore();
const visualizerStore = useVisualizerStore();
const { code } = storeToRefs(editorStore);

const isBuilding = ref(false);

function build() {
  const visualizationRequest: VisualizationRequest = {
    code: code.value,
  };

  isBuilding.value = true;

  buildCode(visualizationRequest)
    .then((visualizationResult: VisualizationResult) => {
      visualizerStore.setFrames(visualizationResult.frames);
    })
    .catch((error) => {
      console.warn(error);
    })
    .finally(() => {
      isBuilding.value = false;
    });
}
</script>

<template>
  <div class="navigation-header mock">
    <v-btn @click="build()" title="Build">
      <v-icon icon="mdi-hammer-screwdriver" />
      Build
    </v-btn>
    <SaveAlgorithmPopup />
  </div>

  <v-dialog v-model="isBuilding" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card
        class="d-flex flex-column align-center justify-center pa-5"
      >
        <v-card-text class="text-center mb-4">
          Your algorithm is building. Take this moment to stretch your
          wrist!
        </v-card-text>
        <v-progress-circular
          size="50"
          color="primary"
          indeterminate
        />
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
