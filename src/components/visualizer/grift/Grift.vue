<template>

  <div>

    <svg
      class="component"
      :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">

      <GraphEdge
        class="clickable"
        v-for="([edgeId, edgePropsPartial], index) in Object.entries(
          edgesPropsPartial,
        )"
        :key="edgeId"
        @click="onGraphEdgeClick(edgeId)"
        v-bind="{ ...edgePropsPartial, index }" />

      <GraphNode
        class="clickable"
        v-for="[vertexId, vertexProps] in Object.entries(
          verticesProps,
        )"
        :key="vertexId"
        @click="onGraphVertexClick(vertexId)"
        v-bind="vertexProps" />

    </svg>

    <div ref="el" :style="style" style="position: fixed">

      <SelectionModal
        v-if="areOptionsVisible"
        @selected="
          (selected) => {
            if (optionSelectionType === 'edge') {
              handleGraphEdgeOptionSelect(selected);
            } else if (optionSelectionType === 'vertex') {
              handleGraphVertexOptionSelect(selected);
            }
            areOptionsVisible = false;
          }
        "
        :options="options" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import GraphEdge from "../graph/GraphEdge.vue";
  import GraphNode from "../graph/GraphNode.vue";
  import SelectionModal from "@/components/utility/SelectionModal.vue";

  import { computed, ref, toRefs, watch } from "vue";
  import { useGraphRenderData } from "./useGraphRenderData";
  import {
    GraphComponent,
    GraphVertex,
  } from "@telefonovat/syga--contract";
  import { useDraggable } from "@vueuse/core";

  interface Props {
    viewBoxSize: number;
    component: GraphComponent;
    edgeOptions: { [key: string]: string };
    vertexOptions: { [key: string]: string };
  }
  const props = defineProps<Props>();
  const emit = defineEmits<{
    (
      e: "edge-option-selected",
      start: GraphVertex,
      end: GraphVertex,
      option: string,
    ): void;
    (
      e: "vertex-option-selected",
      vertex: GraphVertex,
      option: string,
    ): void;
  }>();

  const el = ref<HTMLElement | null>(null);
  const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
  });

  const { verticesProps, edgesPropsPartial } = toRefs(
    useGraphRenderData(props.component, props.viewBoxSize),
  );
  const optionSelectionType = ref<"vertex" | "edge">("edge");
  const options = computed(() =>
    optionSelectionType.value === "vertex"
      ? props.vertexOptions
      : props.edgeOptions,
  );

  const areOptionsVisible = ref(false);
  let handleGraphEdgeOptionSelect: (option: string) => void;
  let handleGraphVertexOptionSelect: (option: string) => void;
  function onGraphEdgeClick(edgeId: string) {
    areOptionsVisible.value = true;

    const tokens = edgeId.split("->");
    const start = tokens[0];
    const end = tokens[1];

    x.value = edgesPropsPartial.value[edgeId].x1 + 500;
    y.value = edgesPropsPartial.value[edgeId].y1;

    optionSelectionType.value = "edge";
    handleGraphEdgeOptionSelect = (option: string) => {
      emit(
        "edge-option-selected",
        { id: start },
        { id: end },
        option,
      );
    };
  }
  function onGraphVertexClick(vertexId: string) {
    areOptionsVisible.value = true;
    optionSelectionType.value = "vertex";
    handleGraphVertexOptionSelect = (option: string) => {
      emit("vertex-option-selected", { id: vertexId }, option);
    };
  }
</script>

<style scoped>
  .component{
  display: block;
  height: 100%;
  margin: auto;
}

  .clickable:hover{
    cursor: pointer
  }
</style>

