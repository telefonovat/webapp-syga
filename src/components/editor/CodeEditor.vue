<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python"
import { useEditorStore } from "@/store/editor/editorStore";
import { storeToRefs } from "pinia";

const editorStore = useEditorStore();
const { code } = storeToRefs(editorStore)
const extensions = [python()];
</script>

<template>
  <Codemirror v-model="code" :extensions="extensions" />
</template>

<style scoped></style>
