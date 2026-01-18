<template>

  <div class="test-view">

    <div v-if="isReady" class="immediate-feedback">

      <ImmediateFeedbackPredictView
        class="immediate-feedback-content"
        :vertexOptions="vertexOptionInput!"
        :edgeOptions="edgeOptionInput!"
        :component="bleachedGraph!"
        :text="algorithmText"
        @edge-option-selected="onSelectEdgeOption"
        @vertex-option-selected="onSelectVertexOption"
        v-if="stage === 'predict'" />

      <ImmmediateFeedbackRevealView
        class="immediate-feedback-content"
        :trueGraphSolution="endGraph!"
        :submittedGraphSolution="bleachedGraph!"
        v-else-if="stage === 'reveal'" />

      <ImmediateFeedbackShowView
        :algorithm="algorithm"
        :frames="visualizationFrames!"
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

  import { computed, onMounted, ref, toRaw } from "vue";
  import {
    GraphComponent,
    GraphVertex,
    VisualizationFrame,
    IFOptions,
    VertexOption,
    EdgeOption,
  } from "@telefonovat/syga--contract";
  import { bleachGraph, retrieveIFExerciseData } from "./util";

  interface Props {
    exerciseId: string;
  }
  const props = defineProps<Props>();
  onMounted(async () => {
    await retrieveExercise();
    prepareExercise();
  });

  const startGraph = ref<GraphComponent | undefined>();
  const endGraph = ref<GraphComponent | undefined>();
  const bleachedGraph = ref<GraphComponent | undefined>();
  const edgeOptionInput = ref<
    IFOptions["edgeOptionInput"] | undefined
  >();
  const vertexOptionInput = ref<
    IFOptions["vertexOptionInput"] | undefined
  >();

  const visualizationFrames = ref<VisualizationFrame[] | undefined>();
  const algorithm = ref<string>("");
  const algorithmText = ref<string>("");
  const isReady = computed(
    () =>
      startGraph.value &&
      endGraph.value &&
      bleachedGraph.value &&
      edgeOptionInput.value &&
      vertexOptionInput.value &&
      visualizationFrames.value,
  );
  //Retrieving exercises from syga--algorithms
  async function retrieveExercise() {
    const {
      options,
      frames,
      algorithm: retrievedAlgorithm,
      markdownText,
    } = await retrieveIFExerciseData(props.exerciseId);
    vertexOptionInput.value = options.vertexOptionInput;
    edgeOptionInput.value = options.edgeOptionInput;
    startGraph.value = frames[0].graphComponents[0];
    endGraph.value = frames[frames.length - 1].graphComponents[0];
    visualizationFrames.value = frames;

    algorithm.value = retrievedAlgorithm;
    algorithmText.value = markdownText;
  }
  function prepareExercise() {
    if (!startGraph.value) return;
    const clone = structuredClone(toRaw(startGraph.value));
    bleachedGraph.value = bleachGraph(clone);
  }

  type ImmediateFeedbackFlowStage = "predict" | "reveal" | "show";
  const stages = [
    "predict",
    "reveal",
    "show",
  ] satisfies ImmediateFeedbackFlowStage[];
  const stage = ref<ImmediateFeedbackFlowStage>("predict");

  function onSelectVertexOption(
    vertex: GraphVertex,
    option: VertexOption,
  ) {
    if (!bleachedGraph.value || !vertexOptionInput.value) return;
    if (vertexOptionInput.value === "number") {
      bleachedGraph.value.style.vertexLabels[vertex.id] =
        option as string;
      return;
    }
    //TODO: Is this the fastest way?
    bleachedGraph.value.style.vertexColors = {
      ...bleachedGraph.value.style.vertexColors,
      [vertex.id]: vertexOptionInput.value[option],
    };
  }
  function onSelectEdgeOption(
    start: GraphVertex,
    end: GraphVertex,
    option: EdgeOption,
  ) {
    if (!bleachedGraph.value || !edgeOptionInput.value) return;
    const startId = start.id;
    const endId = end.id;
    if (edgeOptionInput.value === "number") {
      bleachedGraph.value.style.edgeLabels[startId][endId] =
        option as string;
      return;
    }
    bleachedGraph.value.style.edgeColors[startId][endId] =
      edgeOptionInput.value[option];
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

