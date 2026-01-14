<template>

  <div class="test-view">

    <div v-if="isReady" class="immediate-feedback">

      <ImmediateFeedbackPredictView
        class="immediate-feedback-content"
        :vertexOptions="vertexOptions!"
        :edgeOptions="edgeOptions!"
        :component="bleachedGraph!"
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

  import { computed, onMounted, ref } from "vue";
  import {
    GraphComponent,
    GraphVertex,
  } from "@telefonovat/syga--contract";
  import { bleachGraph, retrieveIFExerciseData } from "./util";
  import {
    EdgeOptions,
    VertexOptions,
  } from "./util/retrieveIFExercise";

  interface Props {
    exerciseId: string;
  }
  const props = defineProps<Props>();
  onMounted(async () => {
    await retrieveExercise();
    prepareExercise();
  });

  const startGraph = ref<GraphComponent | undefined>();
  const bleachedGraph = ref<GraphComponent | undefined>();
  const edgeOptions = ref<EdgeOptions | undefined>();
  const vertexOptions = ref<VertexOptions | undefined>();
  const isReady = computed(
    () =>
      startGraph.value &&
      bleachedGraph.value &&
      edgeOptions.value &&
      vertexOptions.value,
  );
  //Retrieving exercises from syga--algorithms
  async function retrieveExercise() {
    const { options, frames } = await retrieveIFExerciseData(
      props.exerciseId,
    );
    vertexOptions.value = options.vertexOptions;
    edgeOptions.value = options.edgeOptions;
    startGraph.value = frames[0].graphComponents[0];
  }
  function prepareExercise() {
    if (!startGraph.value) return;
    bleachedGraph.value = bleachGraph(startGraph.value);
  }

  type ImmediateFeedbackFlowStage = "predict" | "reveal" | "show";
  const stages = [
    "predict",
    "reveal",
    "show",
  ] satisfies ImmediateFeedbackFlowStage[];
  const stage = ref<ImmediateFeedbackFlowStage>("predict");

  function onSelectVertexOption(vertex: GraphVertex, option: string) {
    if (!bleachedGraph.value || !vertexOptions.value) return;
    //TODO: Is this the fastest way?
    bleachedGraph.value.style.vertexColors = {
      ...bleachedGraph.value.style.vertexColors,
      [vertex.id]: vertexOptions.value[option],
    };
  }
  function onSelectEdgeOption(
    start: GraphVertex,
    end: GraphVertex,
    option: string,
  ) {
    if (!bleachedGraph.value || !edgeOptions.value) return;
    const startId = start.id;
    const endId = end.id;
    bleachedGraph.value.style.edgeColors[startId][endId] =
      edgeOptions.value[option];
  }
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

