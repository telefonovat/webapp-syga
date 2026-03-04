import { buildUrl } from "@/api";
import { buildRequest } from "@/api";
import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
import {
  isExecuteAlgorithmResult,
  isApiErrorResponse,
} from "@telefonovat/syga--contract";
import { triggerNonFatalError } from "../error/useErrorHandler";
import {
  handleAPIError,
  handleUnknownError,
} from "@/api/errorHandler";
import { usePersistentTabSettings } from "../settings/usePersistentTabSettings";

export async function buildCodeNew(code: string) {
  const frames = await fetch(
    buildUrl,
    buildRequest("POST", JSON.stringify({ mode: "anonymous", code })),
  ).then(async (response) => {
    const body = await response.json();

    if (!("success" in body) || !("payload" in body)) {
      // TODO: Proper error handling
      throw "Response from API is deformed";
    }

    const payload = body.payload;

    //HACK: Needs long-term error strategy
    if (!body.success && body.payload.errorMessage) {
      triggerNonFatalError({
        errorMessage:
          payload.errorMessage ??
          "There was an issue executing your code. Please check.",
      });
      return [];
    }

    if (body.success && isExecuteAlgorithmResult(payload)) {
      if (payload.response !== "success") {
        // Engine can send back some frames in case the result is missed
        triggerNonFatalError({
          errorMessage:
            payload.errorMessage ??
            "There was an issue executing your code. Please check.",
        });
        return [];
      }
      return payload.frames;
    } else if (isApiErrorResponse(payload)) {
      handleAPIError();
      return [];
    } else {
      handleUnknownError();
      return [];
    }
  });
  return frames;
}

export function buildCode(code: string) {
  buildCodeNew(code);
  const visualizerStore = useVisualizerStore();

  fetch(
    buildUrl,
    buildRequest("POST", JSON.stringify({ mode: "anonymous", code })),
  ).then(async (response) => {
    const body = await response.json();

    if (!("success" in body) || !("payload" in body)) {
      // TODO: Proper error handling
      throw "Response from API is deformed";
    }

    const payload = body.payload;

    //HACK: Needs long-term error strategy
    if (!body.success && body.payload.errorMessage) {
      triggerNonFatalError({
        errorMessage:
          payload.errorMessage ??
          "There was an issue executing your code. Please check.",
      });
      return;
    }

    if (body.success && isExecuteAlgorithmResult(payload)) {
      if (payload.response !== "success") {
        // Engine can send back some frames in case the result is missed
        triggerNonFatalError({
          errorMessage:
            payload.errorMessage ??
            "There was an issue executing your code. Please check.",
        });
        return;
      }
      visualizerStore.frames = payload.frames;
      visualizerStore.activeFrameNumber = 0;
    } else if (isApiErrorResponse(payload)) {
      handleAPIError();
    } else {
      handleUnknownError();
    }
  });
}
