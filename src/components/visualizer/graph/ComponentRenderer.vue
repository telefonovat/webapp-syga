//Renders a single component of the graph
<script setup lang="ts">
  import GraphNode from "./GraphNode.vue";
  import GraphEdge from "./GraphEdge.vue";
  import { toRefs } from "vue";

  import { useRenderData } from "./renderData";
  import { defaultRendererSettings } from "./defaults";

  import {
    type GraphVertex as GraphVertexType,
    type GraphEdge as GraphEdgeType,
    GraphType,
  } from "@telefonovat/syga--contract";
  import { useEditorStore } from "@/store/editor/editorStore";

  interface Props {
    componentIndex: number;
    viewBoxSize?: number;
  }

  const editorStore = useEditorStore();

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
  type NodeProps = InstanceType<typeof GraphNode>["$props"];

  function getNodeProps(node: GraphVertexType): NodeProps {
    function nodeIsValid(node: GraphVertexType): boolean {
      return (
        nodes.value.includes(node) && !!nodePositions.value[node.id]
      );
    }
    if (!nodeIsValid) {
      throw new Error("Attempt render invalid node : " + node);
    }
    let nodeHasColor =
      nodeColors.value &&
      node.id in nodeColors.value &&
      nodeColors.value[node.id] !== null;
    let nodeHasShape =
      nodeShapes.value &&
      node.id in nodeShapes.value &&
      nodeShapes.value[node.id] !== null;
    let nodeHasLabel =
      nodeLabels.value &&
      node.id in nodeLabels.value &&
      nodeLabels.value[node.id] !== null;
    const data: NodeProps = {
      x: nodePositions.value[node.id].x,
      y: nodePositions.value[node.id].y,
      label: nodeHasLabel ? nodeLabels.value[node.id] : node.id,
      ...(nodeHasColor && { color: nodeColors.value[node.id] }),
      ...(nodeHasShape && { shape: nodeShapes.value[node.id] }),
    };
    return data;
  }

  type EdgeProps = InstanceType<typeof GraphEdge>["$props"];
  function getEdgeProps(
    edge: GraphEdgeType,
  ): Omit<EdgeProps, "index"> {
    function isEdgeValid({ start, end }: GraphEdgeType) {
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
    let edgeHasColour =
      edgeColors.value &&
      start.id in edgeColors.value &&
      end.id in edgeColors.value[start.id] &&
      edgeColors.value[start.id][end.id] !== null;
    let edgeHasShape =
      edgeShapes.value &&
      start.id in edgeShapes.value &&
      end.id in edgeShapes.value[start.id] &&
      edgeShapes.value[start.id][end.id] !== null;
    let edgeHasLabel =
      edgeLabels.value &&
      start.id in edgeLabels.value &&
      end.id in edgeLabels.value[start.id] &&
      edgeLabels.value[start.id][end.id] !== null;
    const data = {
      x1: nodePositions.value[start.id].x,
      y1: nodePositions.value[start.id].y,
      x2: nodePositions.value[end.id].x,
      y2: nodePositions.value[end.id].y,

      ...(edgeHasLabel && {
        label: edgeLabels.value[start.id][end.id],
      }),
      ...(edgeHasColour && {
        color: edgeColors.value[start.id][end.id],
      }),
      ...(edgeHasShape && {
        shape: edgeShapes.value[start.id][end.id],
      }),
    };
    // console.log(data);
    return data;
  }
</script>

<template>

  <div v-if="!editorStore.isCodeBuilding">

    <svg
      class="component"
      :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">

      <GraphEdge
        v-for="(edge, index) in edges"
        v-bind="{
          ...getEdgeProps(edge),

          isDirected: type === GraphType.DIRECTED,

          index: index,
        }" />

      <GraphNode
        v-for="vertex in nodes"
        :data-testid="`graph-vertex-${vertex.id}`"
        v-bind="getNodeProps(vertex)" />

    </svg>

  </div>

  <div v-else role="status">Code is building :)</div>

</template>

<style scoped>
  .component{
  display: block;
  height: 100%;
  margin: auto;
}
</style>

