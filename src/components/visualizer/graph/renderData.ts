import { useVisualizerStore } from '@/store/visualizer/visualizerStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import type { Node } from '@/shared-types/visualization/Node';

//
export function useRenderData(
  componentIndex: number,
  viewBoxSize: number
) {
  const store_ = useVisualizerStore();

  const { currentFrame } = storeToRefs(store_);

  const component = computed(() => {
    return currentFrame.value
      ? currentFrame.value.components[componentIndex]
      : null;
  });

  const type = computed(() =>
    component.value ? component.value.type : 'Graph'
  );

  const nodes = computed(() => {
    return component.value ? component.value.nodes : [];
  });

  const nodeColors = computed(() => {
    return component.value ? component.value.style.nodeColors : {};
  });

  const nodeShapes = computed(() => {
    return component.value ? component.value.style.nodeShapes : {};
  });

  const nodeLabels = computed(() =>
    component.value ? component.value.style.nodeLabels : {}
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
    const positions: { [key: Node]: { x: number; y: number } } = {};

    nodes.value.forEach((node, index) => {
      const rads = Math.PI * 2 * (index / nodes.value.length - 0.25);
      positions[node] = {
        x: Math.cos(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
        y: Math.sin(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
      };
    });

    return positions;
  });

  return {
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
  };
}
