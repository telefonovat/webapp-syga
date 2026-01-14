<template>

  <div class="immediate-feedback-reveal">

    <Grift
      prefix="if-reveal-true"
      :component="trueGraphSolution"
      :edgeOptions="{}"
      :vertexOptions="{}"
      :viewBoxSize="400" />

    <Grift
      prefix="if-reveal-submitted"
      :component="submittedGraphSolution"
      :edgeOptions="{}"
      :vertexOptions="{}"
      :viewBoxSize="400" />

  </div>

</template>

<script setup lang="ts">
  import Grift from "@/components/visualizer/grift/Grift.vue";

  import { GraphComponent } from "@telefonovat/syga--contract";

  interface Props {
    trueGraphSolution: GraphComponent;
    submittedGraphSolution: GraphComponent;
  }
  defineProps<Props>();
</script>

<style scoped>
  .immediate-feedback-reveal{
  display: flex;
  height: 100%;
  & > *{
    flex-grow: 1;
  }
}
</style>

