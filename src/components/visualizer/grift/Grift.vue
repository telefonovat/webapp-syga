<template>

  <div>

    <svg
      class="component"
      :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">

      <GraphEdge
        v-for="(edgeProps, index) in edgesProps"
        v-bind="{ ...edgeProps, index }" />

      <GraphNode
        v-for="vertexProps in verticesProps"
        v-bind="vertexProps" />

    </svg>

  </div>

</template>

<script setup lang="ts">
  import { toRefs } from "vue";
  import GraphEdge from "../graph/GraphEdge.vue";
  import GraphNode from "../graph/GraphNode.vue";
  import { useGraphRenderData } from "./useGraphRenderData";
  import { GraphComponent } from "@telefonovat/syga--contract";

  interface Props {
    viewBoxSize: number;
    component: GraphComponent;
  }

  const props = defineProps<Props>();

  const { verticesProps, edgesProps } = toRefs(
    useGraphRenderData(props.component, props.viewBoxSize),
  );
</script>

<style scoped>
  .component{
  display: block;
  height: 100%;
  margin: auto;
}
</style>

