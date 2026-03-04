<template>

  <ToolbarRoot class="flex">

    <ToolbarButton
      class="btn-primary flex items-center"
      @click="buildCode(code)">

      <Icon icon="streamline-sharp:startup" class="w-5 h-5 pr-1" />
       Build
    </ToolbarButton>

  </ToolbarRoot>

</template>

<script setup lang="ts">
  import { ToolbarButton, ToolbarRoot } from "reka-ui";
  import { Icon } from "@iconify/vue";

  import { buildCode } from "./buildCode";
  import { usePersistentTabSettings } from "../settings/usePersistentTabSettings";
  import { router } from "@/router";

  const { code } = usePersistentTabSettings(
    router.currentRoute.value.fullPath,
  );
</script>

<style scoped></style>

