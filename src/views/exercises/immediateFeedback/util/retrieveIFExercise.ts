import { getIFExerciseUrl } from "@/api";
import {
  GraphComponent,
  GraphType,
  VisualizationFrame,
  isGetIFExerciseSuccessBody,
} from "@telefonovat/syga--contract";
import { buildAlgorithm } from "./buildAlgorithm";

export type EdgeOptions = { [key: string]: string };
export type VertexOptions = { [key: string]: string };
interface IFExerciseOptions {
  edgeOptions: EdgeOptions;
  vertexOptions: VertexOptions;
}
interface IFExerciseData {
  options: IFExerciseOptions;
  algorithm: string;
  frames: VisualizationFrame[];
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

  const { options, algorithm } = body;
  const frames = await buildAlgorithm(algorithm);

  return { options, frames, algorithm };
}
