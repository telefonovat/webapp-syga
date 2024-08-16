<script setup lang="ts">
import CodeEditor from "@/components/editor/CodeEditor.vue";
import { useVisualizerStore } from "@/stores/visualizer";
import { useEditorStore } from "@/stores/editor/editor-store";
import { buildCode } from "@/api/algorithm-connector";

const visualizerStore = useVisualizerStore();
const editorStore = useEditorStore();

function build() {
  buildCode({ code: editorStore.code })
    .then((frames) => {
      visualizerStore.setFrames(frames);
    })
    //TODO: Proper error handling
    .catch((_err) => {

    });
  console.log(visualizerStore.currentFrame);
}
</script>

<template>
  <div class="editor-panel">
    <icon-button @click="build()">Build</icon-button>
    <code-editor />
  </div>
</template>

<style scoped></style>
