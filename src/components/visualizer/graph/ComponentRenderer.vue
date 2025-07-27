//Renders a single component of the graph
<script setup lang="ts">
  import GraphNodeVueComponent from "./GraphNode.vue";
  import GraphEdgeVueComponent from "./GraphEdge.vue";
  import { toRefs } from "vue";

  import { useRenderData } from "./renderData";
  import { defaultRendererSettings } from "./defaults";

  import type { Node } from "@/shared-types/visualization/Node";
  import type { Edge } from "@/shared-types/visualization/Edge";

  import type {
    GraphVertex,
    GraphEdge,
  } from "@telefonovat/syga--contract";

  interface Props {
    componentIndex: number;
    viewBoxSize?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    viewBoxSize: defaultRendererSettings["viewBoxSize"] as number,
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
  } = toRefs(useRenderData(props.componentIndex, props.viewBoxSize));

  //Get props to pass to GraphNode
  type NodeProps = InstanceType<
    typeof GraphNodeVueComponent
  >["$props"];

  function getNodeProps(node: GraphVertex): NodeProps {
    function nodeIsValid(node: GraphVertex): boolean {
      return (
        nodes.value.includes(node) && !!nodePositions.value[node.id]
      );
    }
    if (!nodeIsValid) {
      throw new Error("Attempt render invalid node : " + node);
    }
    // let nodeHasColor =
    //   nodeColors.value &&
    //   node in nodeColors.value &&
    //   nodeColors.value[node] !== null;
    // let nodeHasShape =
    //   nodeShapes.value &&
    //   node in nodeShapes.value &&
    //   nodeShapes.value[node] !== null;
    // let nodeHasLabel =
    //   nodeLabels.value &&
    //   node.id in nodeLabels.value &&
    //   nodeLabels.value[node.id] !== null;
    const data: NodeProps = {
      x: nodePositions.value[node.id].x,
      y: nodePositions.value[node.id].y,
      label: node.id,
      // ...(nodeHasColor && { color: nodeColors.value[node] }),
      // ...(nodeHasShape && { shape: nodeShapes.value[node] }),
    };
    return data;
  }

  type EdgeProps = InstanceType<
    typeof GraphEdgeVueComponent
  >["$props"];
  function getEdgeProps(edge: GraphEdge): Omit<EdgeProps, "index"> {
    function isEdgeValid({ start, end }: GraphEdge) {
      console.log(edges.value);
      console.log(nodes.value);
      console.log(
        `${edges.value.includes(edge)}, ${nodes.value.includes(start)}, ${nodes.value.includes(end)}`,
      );
      return (
        edges.value.includes(edge) &&
        nodes.value.some((node) => node.id === start.id) &&
        nodes.value.some((node) => node.id === end.id)
      );
    }
    if (!isEdgeValid(edge)) {
      throw new Error("Attempt to render invalid edge : " + edge);
    }
    const { start, end } = edge;
    // let edgeHasColour =
    //   edgeColors.value &&
    //   start.id in edgeColors.value &&
    //   end.id in edgeColors.value[start.id] &&
    //   edgeColors.value[start.id][end.id] !== null;
    // let edgeHasShape =
    //   edgeShapes.value &&
    //   start.id in edgeShapes.value &&
    //   end.id in edgeShapes.value[start.id] &&
    //   edgeShapes.value[start.id][end.id] !== null;
    // let edgeHasLabel =
    //   edgeLabels.value &&
    //   start.id in edgeLabels.value &&
    //   end.id in edgeLabels.value[start.id] &&
    //   edgeLabels.value[start.id][end.id] !== null;
    const data = {
      x1: nodePositions.value[start.id].x,
      y1: nodePositions.value[start.id].y,
      x2: nodePositions.value[end.id].x,
      y2: nodePositions.value[end.id].y,

      // ...(edgeHasLabel && {
      //   label: edgeLabels.value[start.id][end.id],
      // }),
      // ...(edgeHasColour && {
      //   color: edgeColors.value[start.id][end.id],
      // }),
      // ...(edgeHasShape && {
      //   shape: edgeShapes.value[start.id][end.id],
      // }),
    };
    // console.log(data);
    return data;
  }
</script>

<template>

  <svg :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">

    <template v-for="(edge, index) in edges">

      <GraphEdgeVueComponent
        v-bind="{
          ...getEdgeProps(edge),

          isDirected: type === 'DiGraph',

          index: index,
        }" />

    </template>

    <template v-for="node in nodes">

      <GraphNodeVueComponent v-bind="getNodeProps(node)" />

    </template>

  </svg>

</template>

<style scoped>

</style>

