<script setup lang="ts">
  import { useEditorStore } from "@/store/editor/editorStore";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";

  import { VisualizationResult } from "@/shared-types/visualization/VisualizationResult";
  import { VisualizationRequest } from "@/shared-types/visualization/VisualizationRequest";
  import { ref } from "vue";
  import { buildUrl } from "@/api/endpoints";
  import { isExecuteAlgorithmResult } from "@telefonovat/syga--contract/response/results/ExecuteAlgorithmSuccessResponse";
  import { isSygaAPIErrorResponse } from "@telefonovat/syga--contract/response/SygaApiErrorResponse";

  const editorStore = useEditorStore();
  const visualizerStore = useVisualizerStore();
  const { code, isCodeBuilding } = storeToRefs(editorStore);

  function buildCode(code: string) {
    isCodeBuilding.value = true;
    fetch(buildUrl, {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "anonymous",
        code,
      }),
    }).then(async (response) => {
      const body = await response.json();

      if (!("success" in body) || !("result" in body)) {
        // TODO: Proper error handling
        throw "Response from API is deformed";
      }

      const result = body.result;

      if (body.success && isExecuteAlgorithmResult(result)) {
        visualizerStore.frames = result.frames;
      } else if (isSygaAPIErrorResponse(result)) {
        console.log("Error");
      } else {
        console.log("Unknown case");
      }

      isCodeBuilding.value = false;
    });
  }
</script>

<template>

  <button @click="buildCode(code)">Build</button>

</template>

<style scoped></style>

