import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
import { storeToRefs } from "pinia";
import { computed, reactive } from "vue";

import { GraphVertex } from "@telefonovat/syga--contract";
type GraphVertexId = GraphVertex["id"];

export function useRenderData(
  componentIndex: number,
  viewBoxSize: number,
) {
  const store = useVisualizerStore();

  const { currentFrame } = storeToRefs(store);

  const component = computed(() => {
    return currentFrame.value
      ? currentFrame.value.graphComponents[componentIndex]
      : null;
  });

  const type = computed(() =>
    component.value ? component.value.type : "Graph",
  );

  const nodes = computed(() => {
    return component.value ? component.value.vertices : [];
  });

  const nodeColors = computed(() => {
    return component.value ? component.value.style.vertexColors : {};
  });

  const nodeShapes = computed(() => {
    return component.value ? component.value.style.vertexShapes : {};
  });

  const nodeLabels = computed(() =>
    component.value ? component.value.style.vertexLabels : {},
  );

  const edges = computed(() => {
    return component.value ? component.value.edges : [];
  });

  const edgeColors = computed(() => {
    return component.value ? component.value.style.edgeColors : {};
  });

  const edgeShapes = computed(() => {
    return component.value ? component.value.style.edgeShapes : {};
  });

  const edgeLabels = computed(() => {
    return component.value ? component.value.style.edgeLabels : {};
  });

  //Evenly places nodes on the circumference of a circle
  const nodePositions = computed(() => {
    const positions: {
      [key: GraphVertexId]: { x: number; y: number };
    } = {};

    nodes.value.forEach((node, index) => {
      const rads = Math.PI * 2 * (index / nodes.value.length - 0.25);
      positions[node.id] = {
        x: Math.cos(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
        y: Math.sin(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
      };
    });

    return positions;
  });

  return reactive({
    type,
    nodes,
    nodeColors,
    nodePositions,
    nodeShapes,
    nodeLabels,
    edges,
    edgeColors,
    edgeShapes,
    edgeLabels,
  });
}
