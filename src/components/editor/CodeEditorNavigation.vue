<script setup lang="ts">
  import { buildCode } from "@/api/connector";

  import { useEditorStore } from "@/store/editor/editorStore";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";

  import { VisualizationResult } from "@/shared-types/visualization/VisualizationResult";
  import { VisualizationRequest } from "@/shared-types/visualization/VisualizationRequest";
  import { ref } from "vue";

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
        visualizerStore.frames = visualizationResult.frames;
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

  <Button @click="build()">Build</Button>

</template>

<style scoped></style>

