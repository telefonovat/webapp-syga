import { getIFExerciseUrl } from "@/api";
import {
  VisualizationFrame,
  IFOptions,
  isGetIFExerciseSuccessBody,
} from "@telefonovat/syga--contract";
import { buildAlgorithm } from "./buildAlgorithm";

interface IFExerciseData {
  options: IFOptions;
  algorithm: string;
  frames: VisualizationFrame[];
  markdownText: string;
}
export async function retrieveIFExerciseData(
  exerciseId: string,
): Promise<IFExerciseData> {
  const exerciseRes = await fetch(getIFExerciseUrl(exerciseId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const body = await exerciseRes.json();
  if (!isGetIFExerciseSuccessBody(body)) {
    throw new Error("Invalid body");
  }

  const { options, algorithm, markdowntext } = body;
  const frames = await buildAlgorithm(algorithm);

  return { options, frames, algorithm, markdownText: markdowntext };
}
