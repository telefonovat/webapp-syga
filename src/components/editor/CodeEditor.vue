<script setup lang="ts">
import CodeMirror from "vue-codemirror6";
import IconButton from "@/components/global/IconButton.vue";

import { python as py } from "@codemirror/lang-python";
import type { LanguageSupport } from "@codemirror/language";
import { ref } from "vue";

import { buildCode } from "@/api/algorithm-connector";
import { useVisualizerStore } from "@/stores/visualizer";
const code = ref("print('Hello world')");
const store = useVisualizerStore();
const lang: LanguageSupport = py();

function build() {
  console.log("Building");
  buildCode({ code: code.value })
    .then((frames) => {
      store.setFrames(frames);
    })
}
</script>

<template>
  <div>
    <icon-button @click="build()" />
    <code-mirror basic v-model="code" :dark="true" :lang="lang" />
  </div>
</template>

<style scoped></style>
