<script setup lang="ts">
/*
 * Reponsible for receiving user input and synchronizing the store
  */
import CodeMirror from "vue-codemirror6";

import { python as py } from "@codemirror/lang-python";
import type { LanguageSupport } from "@codemirror/language";

import { useEditorStore } from "@/stores/editor/editor-store.ts";
import { storeToRefs } from "pinia";

import { useEditorVisuals } from "./editor-visuals.ts";
import { watch } from "vue";

const store = useEditorStore();
const { code } = storeToRefs(store);
const lang: LanguageSupport = py();

const { highlightStyle } = useEditorVisuals("code-editor");
watch(highlightStyle, (_new, _old) => {
  console.log(highlightStyle);
})
</script>f

<template>
  <div class="code-editor">
    <code-mirror basic v-model="code" :dark="true" :lang="lang" />

  </div>
</template>

<style scoped>
</style>
