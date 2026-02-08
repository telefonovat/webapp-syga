<template>

  <div class="immediate-feedback-reveal">

    <SplitterGroup id="if-reveal" direction="horizontal">

      <SplitterPanel>

        <Grift
          title="Correct Solution"
          prefix="if-reveal-true"
          class="immediate-feedback-reveal-left"
          :component="trueGraphSolution"
          :edgeOptions="{}"
          :vertexOptions="{}"
          :viewBoxSize="400" />

      </SplitterPanel>

      <SplitterResizeHandle />

      <SplitterPanel>

        <Grift
          title="Your Solution"
          prefix="if-reveal-submitted"
          :component="submittedGraphSolution"
          :edgeOptions="{}"
          :vertexOptions="{}"
          :viewBoxSize="400" />

      </SplitterPanel>

    </SplitterGroup>

  </div>

</template>

<script setup lang="ts">
  import Grift from "@/components/visualizer/grift/Grift.vue";

  import { GraphComponent } from "@telefonovat/syga--contract";

  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "reka-ui";

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
  .immediate-feedback-reveal-left{
    border-right: 1px solid #444;
  }
}
</style>

