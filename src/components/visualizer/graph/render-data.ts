import { useVisualizerStore } from "@/stores/visualizer";
import { computed } from "vue";
import Component from "@/interfaces/backend/Component";
import Node from "@/interfaces/backend/Node";
import Edge from "@/interfaces/backend/Edge";

export function useRenderData(componentIndex: number, viewBoxSize: number) {
  const store = useVisualizerStore();

  const component = computed<Component>(() => store.currentFrame.components[componentIndex]);
  const nodes = computed<Node[]>(() => component.value.nodes);
  const edges = computed<Edge[]>(() => component.value.edges);

  const nodeColors = computed(() => component.value.style.node_colors);
  const edgeColors = computed(() => component.value.style.edge_colors);


  const nodePositions = computed(() => {
    const positions: { [key: number]: { x: number, y: number } } = {};

    nodes.value.forEach((node, index) => {
      const rads = Math.PI * 2 * (index / nodes.value.length - 0.25);
      positions[node] = {
        x: Math.cos(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
        y: Math.sin(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
      }
    });

    return positions;
  });
  return {
    component, nodes, edges,
    nodeColors, edgeColors,
    nodePositions,
  }
}
