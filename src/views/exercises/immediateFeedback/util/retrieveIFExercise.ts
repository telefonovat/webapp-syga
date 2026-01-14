import {
  GraphComponent,
  GraphType,
  VisualizationFrame,
} from "@telefonovat/syga--contract";

export type EdgeOptions = { [key: string]: string };
export type VertexOptions = { [key: string]: string };
interface IFExerciseOptions {
  edgeOptions: EdgeOptions;
  vertexOptions: VertexOptions;
}
interface IFExerciseData {
  options: IFExerciseOptions;
  frames: VisualizationFrame[];
}
export async function retrieveIFExerciseData(
  exerciseId: string,
): Promise<IFExerciseData> {
  const edgeOptions = {
    tree: "grey",
    back: "red",
    cross: "blue",
  };
  const vertexOptions = {
    good: "white",
    bad: "black",
  };

  const testGraph: GraphComponent = {
    type: GraphType.DIRECTED,
    vertices: [{ id: 1 }, { id: 2 }, { id: 3 }],
    edges: [
      {
        start: {
          id: 1,
        },
        end: { id: 2 },
      },
      { start: { id: 2 }, end: { id: 3 } },
    ],
    style: {
      vertexColors: {
        "1": "white",
        "2": "white",
        "3": "white",
      },
      edgeColors: {
        "1": { "2": "black" },
        "2": { "3": "black" },
      },
      vertexLabels: {},
      edgeLabels: {},
      vertexShapes: {},
      edgeShapes: {},
    },
  };

  return {
    options: {
      edgeOptions,
      vertexOptions,
    },
    frames: [
      { consoleLogs: [], lineNo: [1], graphComponents: [testGraph] },
    ],
  };
}
