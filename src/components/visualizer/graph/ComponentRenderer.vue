//Renders a single component of the graph
<script setup lang="ts">
import GraphNode from './GraphNode.vue';
import GraphEdge from './GraphEdge.vue';
import { toRefs } from 'vue';

import { useRenderData } from './renderData';
import { defaultRendererSettings } from './defaults';

import type { Node } from '@/shared-types/visualization/Node';
import type { Edge } from '@/shared-types/visualization/Edge';

interface Props {
  componentIndex: number;
  viewBoxSize?: number;
}

const props_ = withDefaults(defineProps<Props>(), {
  viewBoxSize: defaultRendererSettings['viewBoxSize'] as number,
});

const {
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
} = toRefs(useRenderData(props_.componentIndex, props_.viewBoxSize));

//Get props to pass to GraphNode
type NodeProps = InstanceType<typeof GraphNode>['$props'];

function getNodeProps(node: Node): NodeProps {
  function nodeIsValid(node: Node): boolean {
    return nodes.value.includes(node) && !!nodePositions.value[node];
  }
  if (!nodeIsValid) {
    throw new Error('Attempt render invalid node : ' + node);
  }
  let nodeHasColor =
    node in nodeColors.value && nodeColors.value[node] !== null;
  let nodeHasShape =
    node in nodeShapes.value && nodeShapes.value[node] !== null;
  const data: NodeProps = {
    x: nodePositions.value[node].x,
    y: nodePositions.value[node].y,
    label: nodeLabels.value[node] ?? node,
    ...(nodeHasColor && { color: nodeColors.value[node] }),
    ...(nodeHasShape && { shape: nodeShapes.value[node] }),
  };
  return data;
}

type EdgeProps = InstanceType<typeof GraphEdge>['$props'];
function getEdgeProps(edge: Edge): Omit<EdgeProps, 'index'> {
  function isEdgeValid([u, v]: Edge) {
    return (
      edges.value.includes(edge) &&
      nodes.value.includes(u) &&
      nodes.value.includes(v)
    );
  }
  if (!isEdgeValid(edge)) {
    throw new Error('Attempt to render invalid edge : ' + edge);
  }
  const [u, v] = edge;
  let edgeHasColour =
    u in edgeColors.value &&
    v in edgeColors.value[u] &&
    edgeColors.value[u][v] !== null;
  let edgeHasShape =
    u in edgeShapes.value &&
    v in edgeShapes.value[u] &&
    edgeShapes.value[u][v] !== null;
  let edgeHasLabel =
    u in edgeLabels.value &&
    v in edgeLabels.value[u] &&
    edgeLabels.value[u][v] !== null;
  const data = {
    x1: nodePositions.value[u].x,
    y1: nodePositions.value[u].y,
    x2: nodePositions.value[v].x,
    y2: nodePositions.value[v].y,

    ...(edgeHasLabel && { label: edgeLabels.value[u][v] }),
    ...(edgeHasColour && { color: edgeColors.value[u][v] }),
    ...(edgeHasShape && { shape: edgeShapes.value[u][v] }),
  };
  // console.log(data);
  return data;
}
</script>

<template>
  <!-- <v-container class="ma-0 pa-0"> -->
  <svg
    class="component-renderer mock"
    :viewBox="`0 0 ${props_.viewBoxSize} ${props_.viewBoxSize}`"
  >
    <template v-for="(edge, index) in edges">
      <GraphEdge
        v-bind="{
          ...getEdgeProps(edge),
          isDirected: type === 'DiGraph',
          index: index,
        }"
      />
    </template>

    <template v-for="node in nodes">
      <GraphNode v-bind="getNodeProps(node)" />
    </template>
  </svg>
  <!-- </v-container> -->
</template>

<style scoped>
.component-renderer{
  /* flex-grow:; */
  height: 75%;
}
</style>
