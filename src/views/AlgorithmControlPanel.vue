<template>

  <div class="panel-wrapper">

    <div class="navigation-container">

      <CodeEditorNavigation />

      <VisualizerNavigation />

      <!-- <UserQOLControlPanel /> -->

      <PreferencesPopoverButton class="h-full" />

      <ExercisesNavigationPopoverButton class="h-full" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import VisualizerNavigation from "@/components/visualizer/VisualizerNavigation.vue";
  import CodeEditorNavigation from "@/components/editor/CodeEditorNavigation.vue";
  import PreferencesPopoverButton from "@/components/settings/preferences/PreferencesPopoverButton.vue";
  import ExercisesNavigationPopoverButton from "@/components/ExercisesNavigationPopoverButton.vue";
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

