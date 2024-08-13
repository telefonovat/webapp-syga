<script setup lang="ts">
//TODO: Fixed sizes, Code highlighting
import { ref, watch } from "vue";
import CodeMirror from "vue-codemirror6";
import type { LanguageSupport } from "@codemirror/language";

import { python as py } from "@codemirror/lang-python";

const value = ref<string>("");
watch(value, (newValue) => {
  console.log(`New code is ${newValue}!`);
})

const lang: LanguageSupport = py();
</script>

<template>
  <code-mirror v-model="value" basic :lang="lang" />
</template>

<style scoped></style>
