<template>

  <div class="panel-wrapper">

    <div class="navigation-container">

      <CodeEditorNavigation />

      <VisualizerNavigation />

    </div>

  </div>

</template>

<script setup lang="ts">
  import VisualizerNavigation from "@/components/visualizer/VisualizerNavigation.vue";
  import CodeEditorNavigation from "@/components/editor/CodeEditorNavigation.vue";

  import { Separator } from "radix-vue";
</script>

<style scoped>
  .panel-wrapper{
  width: 100%;
  display: flex;
  align-items: stretch;
}

.navigation-container{
  display: flex;
}
</style>

