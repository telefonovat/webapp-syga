<script setup lang="ts">
import CodeMirror from "vue-codemirror6";

import { python as py } from "@codemirror/lang-python";
import type { LanguageSupport } from "@codemirror/language";
import { ref } from "vue";

const code = ref("print('Hello world')");

const lang: LanguageSupport = py();
</script>

<template>
  <div>
    <code-mirror basic v-model="code" :dark="true" :lang="lang" />
  </div>
</template>

<style scoped></style>
