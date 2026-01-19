<template>

  <div class="immediate-feedback-reveal">

    <Grift
      title="Correct Solution"
      prefix="if-reveal-true"
      class="immediate-feedback-reveal-left"
      :component="trueGraphSolution"
      :edgeOptions="{}"
      :vertexOptions="{}"
      :viewBoxSize="400" />

    <Grift
      title="Your Solution"
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
  import { onMounted } from "vue";

  interface Props {
    trueGraphSolution: GraphComponent;
    submittedGraphSolution: GraphComponent;
  }
  const props = defineProps<Props>();
  onMounted(() => console.log(props.trueGraphSolution));
</script>

<style scoped>
  .immediate-feedback-reveal{
  display: flex;
  height: 100%;
  & > *{
    flex-grow: 1;
  }
  .immediate-feedback-reveal-left{
    border-right: 1px solid #444;
  }
}
</style>

