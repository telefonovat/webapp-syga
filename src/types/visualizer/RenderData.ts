import {
  EdgeColors,
  EdgeLabels,
  EdgeShapes,
  NodeColors,
  NodeLabels,
  NodeShapes,
} from "@telefonovat/syga--contract";
import { Edge } from "@telefonovat/syga--contract";
import { Node } from "@telefonovat/syga--contract";

export interface NodePositions {
  [key: Node]: {
    x: number;
    y: number;
  };
}

export interface RenderData {
  //todo: refactor so that this type depends on shared-types
  type: "DiGraph" | "Graph";

  nodes: Node[];
  nodeShapes: NodeShapes;
  nodeLabels: NodeLabels;
  nodeColors: NodeColors;

  edges: Edge[];
  edgeShapes: EdgeShapes;
  edgeLabels: EdgeLabels;
  edgeColors: EdgeColors;

  nodePositions: NodePositions;
}
