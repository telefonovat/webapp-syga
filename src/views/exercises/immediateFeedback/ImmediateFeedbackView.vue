<template>

  <div class="test-view">

    <div class="immediate-feedback">

      <ImmediateFeedbackPredictView
        class="immediate-feedback-content"
        :component="testGraph"
        v-if="stage === 'predict'" />

      <ImmediateFeedbackControlPanel
        class="immediate-feedback-control-panel" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import ImmediateFeedbackPredictView from "./ImmediateFeedbackPredictView.vue";
  import ImmediateFeedbackControlPanel from "./ImmediateFeedbackControlPanel.vue";

  import { ref } from "vue";
  import {
    GraphComponent,
    GraphType,
  } from "@telefonovat/syga--contract";

  type ImmediateFeedbackFlowStage = "predict" | "reveal" | "show";
  const stage = ref<ImmediateFeedbackFlowStage>("predict");

  const testGraph: GraphComponent = {
    type: GraphType.DIRECTED,
    vertices: [{ id: 1 }, { id: 2 }, { id: 3 }],
    edges: [
      {
        start: {
          id: 1,
        },
        end: { id: 2 },
      },
      { start: { id: 2 }, end: { id: 3 } },
    ],
    style: {
      vertexColors: {
        "1": "white",
        "2": "white",
        "3": "white",
      },
      edgeColors: {
        "1": { "2": "black" },
        "2": { "3": "black" },
      },
      vertexLabels: {},
      edgeLabels: {},
      vertexShapes: {},
      edgeShapes: {},
    },
  };
</script>

<style scoped>
  .immediate-feedback{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

}

  .immediate-feedback-content{
    flex-grow: 6;
  }
  .immediate-feedback-control-panel{
    flex-grow: 2;
  }
</style>

