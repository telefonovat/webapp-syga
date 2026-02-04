<script setup lang="ts">
  import { useEditorStore } from "@/store/editor/editorStore";
  import { storeToRefs } from "pinia";
  import { buildCode } from "./buildCode";

  const editorStore = useEditorStore();
  const { code } = storeToRefs(editorStore);
</script>

<template>

  <button class="btn-primary" @click="buildCode(code)">Build</button>

</template>

<style scoped></style>

