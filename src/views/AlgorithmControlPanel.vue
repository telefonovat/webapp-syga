<script setup lang="ts">
  import VisualizerNavigation from "@/components/visualizer/VisualizerNavigation.vue";
  import CodeEditorNavigation from "@/components/editor/CodeEditorNavigation.vue";
  import AlgorithmManager from "@/components/user/algorithm/AlgorithmManager.vue";
</script>

<template>

  <div class="panel-wrapper" dark density="compact">

    <AlgorithmManager style="width: 50%" />

    <div class="navigation-container">

      <CodeEditorNavigation />

      <VisualizerNavigation
        data-testid="visualizer-navigation-panel" />

    </div>

  </div>

</template>

<style scoped>
  .panel-wrapper{
  width: 100%;
  display: flex;
  align-items: center;
}

.navigation-container{
  display: flex;
  width: 50%;
}
</style>

