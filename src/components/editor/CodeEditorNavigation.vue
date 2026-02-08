
<template>

  <ToolbarRoot>

    <ToolbarButton class="btn-primary" @click="buildCode(code)">
       Build
    </ToolbarButton>

  </ToolbarRoot>

  <!-- <button class="btn-primary" @click="buildCode(code)">Build</button> -->

</template>

<script setup lang="ts">
  import { useEditorStore } from "@/store/editor/editorStore";
  import { storeToRefs } from "pinia";
  import { buildCode } from "./buildCode";

  import { ToolbarButton, ToolbarRoot } from "radix-vue";

  const editorStore = useEditorStore();
  const { code } = storeToRefs(editorStore);
</script>

<style scoped></style>

