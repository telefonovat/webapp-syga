<template>

  <div class="test-view">

    <div class="immediate-feedback">

      <ImmediateFeedbackPredictView
        class="immediate-feedback-content"
        :vertexOptions="vertexOptions"
        :edgeOptions="edgeOptions"
        :component="bleachedGraph"
        @edge-option-selected="onSelectEdgeOption"
        @vertex-option-selected="onSelectVertexOption"
        v-if="stage === 'predict'" />

      <ImmmediateFeedbackRevealView
        class="immediate-feedback-content"
        v-else-if="stage === 'reveal'" />

      <ImmediateFeedbackShowView
        class="immediate-feedback-content"
        v-else-if="stage === 'show'" />

      <ImmediateFeedbackControlPanel
        :stages="stages"
        v-model="stage"
        class="immediate-feedback-control-panel" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import ImmediateFeedbackPredictView from "./ImmediateFeedbackPredictView.vue";
  import ImmediateFeedbackControlPanel from "./ImmediateFeedbackControlPanel.vue";
  import ImmmediateFeedbackRevealView from "./ImmediateFeedbackRevealView.vue";
  import ImmediateFeedbackShowView from "./ImmediateFeedbackShowView.vue";

  import { ref } from "vue";
  import {
    GraphComponent,
    GraphType,
    GraphVertex,
  } from "@telefonovat/syga--contract";
  import { bleachGraph } from "./util";

  type ImmediateFeedbackFlowStage = "predict" | "reveal" | "show";
  const stages = [
    "predict",
    "reveal",
    "show",
  ] satisfies ImmediateFeedbackFlowStage[];
  const stage = ref<ImmediateFeedbackFlowStage>("predict");

  function onSelectVertexOption(vertex: GraphVertex, option: string) {
    //TODO: Is this the fastest way?
    bleachedGraph.value.style.vertexColors = {
      ...bleachedGraph.value.style.vertexColors,
      [vertex.id]:
        vertexOptions[option as keyof typeof vertexOptions],
    };
  }
  function onSelectEdgeOption(
    start: GraphVertex,
    end: GraphVertex,
    option: string,
  ) {
    const startId = start.id;
    const endId = end.id;
    bleachedGraph.value.style.edgeColors[startId][endId] =
      edgeOptions[option as keyof typeof edgeOptions];
  }

  const edgeOptions = {
    tree: "grey",
    back: "red",
    cross: "blue",
  };
  const vertexOptions = {
    good: "#0F0",
    bad: "#444",
  };
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

  const bleachedGraph = ref(bleachGraph(testGraph));
</script>

<style scoped>
  .test-view{
    height: 100%;
  }
  .immediate-feedback{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

}

  .immediate-feedback-content{
    flex-grow: 11;
  }
  .immediate-feedback-control-panel{
    flex-grow: 1;
    max-height: 15%;
    min-height: 10%;
  }
</style>

