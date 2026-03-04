<template>

  <ToolbarRoot class="flex">

    <ToolbarButton
      class="btn-primary flex items-center"
      @click="
        async () => {
          const visualizerStore = useVisualizerStore();
          const frames = await buildCodeNew(code);
          visualizerStore.frames = frames;
          visualizerStore.activeFrameNumber = 0;
          markClean();
        }
      ">

      <Icon icon="streamline-sharp:startup" class="w-5 h-5 pr-1" />
       Build
    </ToolbarButton>

  </ToolbarRoot>

</template>

<script setup lang="ts">
  import { ToolbarButton, ToolbarRoot } from "reka-ui";
  import { Icon } from "@iconify/vue";

  import { buildCodeNew } from "./buildCode";
  import { usePersistentTabSettings } from "../settings/usePersistentTabSettings";
  import { router } from "@/router";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";

  const { code, markClean } = usePersistentTabSettings(
    router.currentRoute.value.fullPath,
  );
</script>

<style scoped></style>

