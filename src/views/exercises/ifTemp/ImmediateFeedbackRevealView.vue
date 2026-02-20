<template>

  <div class="h-full flex items-stretch">

    <div class="grow-1">

      <h1>Correct solution produced by the engine</h1>

      <Grift
        class="h-9/10"
        static
        prefix="immediatefeedback-reveal-correct"
        :edgeColorChoices="[]"
        :viewBoxSize="400"
        :component="solution"
        :vertexOptions="{}"
        :edgeOptions="{}" />

    </div>

    <div class="grow-1">

      <h1>(Hopefully?) correct solution you produced</h1>

      <Grift
        class="h-9/10"
        static
        prefix="immediatefeedback-reveal-user-submitted"
        :edgeColorChoices="[]"
        :viewBoxSize="400"
        :component="userSubmitted"
        :vertexOptions="{}"
        :edgeOptions="{}" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import Grift from "@/components/visualizer/grift/Grift.vue";

  import { GraphComponent } from "@telefonovat/syga--contract";

  interface Props {
    solution: GraphComponent;
    userSubmitted: GraphComponent;
  }
  defineProps<Props>();
</script>

