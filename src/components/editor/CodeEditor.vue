<script setup lang="ts">
import CodeMirror from "vue-codemirror6";

import { python as py } from "@codemirror/lang-python";
import type { LanguageSupport } from "@codemirror/language";

import { useEditorStore } from "@/stores/editor/editor-store.ts";
import { storeToRefs } from "pinia";

const store = useEditorStore();
const { code } = storeToRefs(store);
const lang: LanguageSupport = py();

</script>

<template>
  <div>
    <code-mirror basic v-model="code" :dark="true" :lang="lang" />
  </div>
</template>

<style scoped></style>
