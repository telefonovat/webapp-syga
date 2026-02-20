<template>

  <div class="flex items-stretch">

    <div class="bg-red-500 grow-1">

      <h1>Stuff</h1>

    </div>

    <Grift
      class=""
      prefix="immediatefeedback-predict"
      :viewBoxSize="400"
      :component="component"
      :vertexOptions="{}"
      :edgeOptions="{}" />

  </div>

</template>

<script setup lang="ts">
  import Grift from "@/components/visualizer/grift/Grift.vue";

  import { GraphComponent } from "@telefonovat/syga--contract";

  const component = defineModel<GraphComponent>("component", {
    required: true,
  });
</script>

