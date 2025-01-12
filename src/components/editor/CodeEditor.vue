<script setup lang="ts">
import { Codemirror } from 'vue-codemirror';
import { python } from '@codemirror/lang-python';
import { useEditorStore } from '@/store/editor/editorStore';
import { storeToRefs } from 'pinia';
import { oneDark } from '@codemirror/theme-one-dark';

const editorStore = useEditorStore();

const { code } = storeToRefs(editorStore);
const extensions = [python(), oneDark];
</script>

<template>
  <div class="code-editor mock">
    <Codemirror v-model="code" :extensions="extensions" />
  </div>
</template>

<style scoped>
.cm-editor, .code-editor{
  background-color: #282c34;
  height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>
