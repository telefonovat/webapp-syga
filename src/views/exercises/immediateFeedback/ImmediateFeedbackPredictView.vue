<template>

  <!-- Exercise description and GRIFT(Graph Response Input Form Tool) side by side-->

  <!-- Also control panel with prev, next,retry buttons at the bottom -->

  <div class="immediate-feedback-predict">

    <PrettyText />

    <Grift
      prefix="if-predict"
      @edge-option-selected="
        (start, end, option) =>
          emit('edge-option-selected', start, end, option)
      "
      @vertex-option-selected="
        (vertex, option) =>
          emit('vertex-option-selected', vertex, option)
      "
      :edgeOptions="edgeOptions"
      :vertexOptions="vertexOptions"
      :component="props.component"
      :viewBoxSize="400" />

  </div>

</template>

<script setup lang="ts">
  import {
    GraphComponent,
    GraphVertex,
  } from "@telefonovat/syga--contract";
  import Grift from "@/components/visualizer/grift/Grift.vue";
  import PrettyText from "@/components/utility/text/PrettyText.vue";

  interface Props {
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
</script>

<style scoped>
  .immediate-feedback-predict{
    display: flex;
    height: 100%;
    & > *{
      flex-grow: 1;
    }

    border-bottom: 1px solid #444;
  }
</style>

