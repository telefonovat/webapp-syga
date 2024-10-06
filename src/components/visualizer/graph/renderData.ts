import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { Node } from "@/shared/Node";

export function useRenderData(componentIndex: number, viewBoxSize: number) {
  const store_ = useVisualizerStore();

  //HACK: Locally store currentFrame so that we can do type-narrowing
  const { currentFrame } = storeToRefs(store_);


  // Reactive computed property to handle potential null value in currentFrame
  const component = computed(() => {
    return currentFrame.value ? currentFrame.value.components[componentIndex] : null;
  });

  // Ensure nodes and nodeColors are computed only if component exists
  const nodes = computed(() => {
    return component.value ? component.value.nodes : [];
  });

  const nodeColors = computed(() => {
    return component.value ? component.value.style.nodeColors : [];
  });

  const edges = computed(() => {
    return component.value ? component.value.edges : [];
  })

  const edgeColors = computed(() => {
    return component.value ? component.value.style.edgeColors : {};
  })

  const nodePositions = computed(() => {

    const positions: { [key: Node]: { x: number, y: number } } = {};

    nodes.value.forEach((node, index) => {
      const rads = Math.PI * 2 * (index / nodes.value.length - 0.25);
      positions[node] = {
        x: Math.cos(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
        y: Math.sin(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
      };
    });

    return positions;
  });

  // Return the computed properties for use elsewhere
  return {
    component,
    nodes, nodeColors, nodePositions,
    edges, edgeColors,
  };
}
