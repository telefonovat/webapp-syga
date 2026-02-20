<template>

  <div class="panel-wrapper">

    <div class="navigation-container">

      <CodeEditorNavigation />

      <Separator
        class="bg-stone-300/50 self-center data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-3/4 data-[orientation=vertical]:w-px mx-[15px]"
        decorative
        orientation="vertical" />

      <VisualizerNavigation />

      <Separator
        class="bg-stone-300/50 self-center data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-3/4 data-[orientation=vertical]:w-px mx-[15px]"
        decorative
        orientation="vertical" />

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

  import { Separator } from "reka-ui";
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

