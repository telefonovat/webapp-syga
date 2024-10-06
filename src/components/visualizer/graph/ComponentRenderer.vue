//Renders a single component of the graph
<script setup lang="ts">
import GraphNode from "./GraphNode.vue";

import { useRenderData } from "./renderData";
import { defaultRendererSettings } from "./defaults";
import { Node } from "@/shared/Node";
import { onMounted } from "vue";
import { useAnimationStore } from "@/store/visualizer/animationStore";
import { simpleGraph } from "@/store/mock/frames";



interface Props {
  componentIndex: number,
  viewBoxSize?: number,
}

const props_ = withDefaults(defineProps<Props>(), {
  viewBoxSize: defaultRendererSettings["viewBoxSize"] as number,
});

onMounted(() => {
  const store_ = useAnimationStore();

  store_.setFrames(simpleGraph);
});


//Nodes
const { nodes, nodeColors, nodePositions } =
  useRenderData(props_.componentIndex, props_.viewBoxSize);

function getNodeData(node: Node) {
  function nodeIsValid(node: Node): boolean {
    return nodes.value.includes(node) &&
      !!nodePositions.value[node];
  }
  if (!nodeIsValid) {
    throw new Error("Attempt render invalid node : " + node);
  }

  const data = {
    x: nodePositions.value[node].x,
    y: nodePositions.value[node].y,
    label: node,
    ...("color" in nodeColors.value && { color: nodeColors.value["color"] })
  }
  return data;

}


</script>

<template>
  <svg class="component-renderer mock" :viewBox="`0 0 ${props_.viewBoxSize} ${props_.viewBoxSize}`">
    <template v-for="(node) in nodes">
      <GraphNode v-bind="getNodeData(node)" />
    </template>
  </svg>
</template>

<style scoped></style>
