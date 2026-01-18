import { buildUrl } from "@/api";
import { useEditorStore } from "@/store/editor/editorStore";
import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
import {
  isExecuteAlgorithmResult,
  isApiErrorResponse,
} from "@telefonovat/syga--contract";
import { storeToRefs } from "pinia";

export function buildCode(code: string) {
  const editorStore = useEditorStore();
  const visualizerStore = useVisualizerStore();
  const { isCodeBuilding } = storeToRefs(editorStore);
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
