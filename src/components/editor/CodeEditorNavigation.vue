<script setup lang="ts">
  import { useEditorStore } from "@/store/editor/editorStore";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";

  import { buildUrl } from "@/api/endpoints";
  import { isExecuteAlgorithmResult } from "@telefonovat/syga--contract/response/results/ExecuteAlgorithmSuccessResponse";
  import { isApiErrorResponse } from "@telefonovat/syga--contract/response";

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
      credentials: "include",
      body: JSON.stringify({
        mode: "anonymous",
        code,
      }),
    }).then(async (response) => {
      const body = await response.json();

      if (!("success" in body) || !("payload" in body)) {
        // TODO: Proper error handling
        throw "Response from API is deformed";
      }

      const payload = body.payload;

      if (body.success && isExecuteAlgorithmResult(payload)) {
        visualizerStore.frames = payload.frames;
        visualizerStore.activeFrameNumber = 0;
      } else if (isApiErrorResponse(payload)) {
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

