import {
  EdgeColors,
  EdgeLabels,
  EdgeShapes,
  NodeColors,
  NodeLabels,
  NodeShapes,
} from '@/shared-types/visualization/ComponentStyle';
import { Edge } from '@/shared-types/visualization/Edge';
import { Node } from '@/shared-types/visualization/Node';

export interface NodePositions {
  [key: Node]: {
    x: number;
    y: number;
  };
}

export interface RenderData {
  //todo: refactor so that this type depends on shared-types
  type: 'DiGraph' | 'Graph';

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
