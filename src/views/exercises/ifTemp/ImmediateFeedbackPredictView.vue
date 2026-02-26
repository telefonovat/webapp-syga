<template>

  <div class="flex items-stretch">

    <div class="grow-1">

      <h1>Practice your DFS Skills!</h1>

      <p>
         Practice how well you understand depth-first search by
        predicting what it does to this graph. Identify tree edges,
        back edges, forward edges and cross edges. We start at vertex
        A.
      </p>

      <p>
         For choosing which neighbor to explore first, pick by
        alphabetical order. There may be more than one component. If
        you have exhausted one component, choose the next unexplored
        vertex in alphabetical order. In order to pick edge type,
        click on the edge.
      </p>

      <strong>
         Red denotes tree edges, blue denotes back edges, gold denotes
        forward edges and green denotes cross edges.
      </strong>

      <strong>
         Please choose all edges before moving onto the solution!
      </strong>

    </div>

    <Grift
      class=""
      prefix="immediatefeedback-predict"
      @edge-color-choice-made="onEdgeColorChoice"
      :edgeColorChoices="edgeColorChoices"
      :viewBoxSize="400"
      :component="component"
      :vertexOptions="{}"
      :edgeOptions="{}" />

  </div>

</template>

<script setup lang="ts">
  import Grift from "@/components/visualizer/grift/Grift.vue";

  import {
    GraphComponent,
    GraphVertex,
  } from "@telefonovat/syga--contract";
  import { EdgeChoice } from "./useImmediateFeedbackData";

  interface Props {
    edgeColorChoices: EdgeChoice[];
  }
  defineProps<Props>();

  const component = defineModel<GraphComponent>("component", {
    required: true,
  });

  function onEdgeColorChoice(
    [start, end]: [GraphVertex, GraphVertex],
    { color }: EdgeChoice,
  ) {
    component.value.style.edgeColors[start.id][end.id] = color;
  }
</script>

