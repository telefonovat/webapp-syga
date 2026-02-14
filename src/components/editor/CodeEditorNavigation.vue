
<template>

  <ToolbarRoot>

    <ToolbarButton
      class="btn-primary flex items-center"
      @click="buildCode(code)">

      <Icon icon="streamline-sharp:startup" class="w-5 h-5 pr-1" />
       Build
    </ToolbarButton>

  </ToolbarRoot>

  <!-- <button class="btn-primary" @click="buildCode(code)">Build</button> -->

</template>

<script setup lang="ts">
  import { ToolbarButton, ToolbarRoot } from "reka-ui";
  import { Icon } from "@iconify/vue";

  import { useEditorStore } from "@/store/editor/editorStore";
  import { storeToRefs } from "pinia";
  import { buildCode } from "./buildCode";

  const editorStore = useEditorStore();
  const { code } = storeToRefs(editorStore);
</script>

<style scoped></style>

