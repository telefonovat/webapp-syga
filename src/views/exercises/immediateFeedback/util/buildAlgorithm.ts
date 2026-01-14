import { buildUrl } from "@/api/endpoints";
import { VisualizationFrame } from "@telefonovat/syga--contract";
import { isExecuteAlgorithmResult } from "@telefonovat/syga--contract/response/results/ExecuteAlgorithmSuccessResponse";

export async function buildAlgorithm(
  algorithm: string,
): Promise<VisualizationFrame[]> {
  const response = await fetch(buildUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      mode: "anonymous",
      code: algorithm,
    }),
  });
  const body = await response.json();
  const payload = body.payload;

  if (!isExecuteAlgorithmResult(payload)) {
    throw new Error("Invalid body");
  }

  return payload.frames;
}
