<script setup lang="ts">
import { useEditorStore } from '@/store/editor/editorStore';

const editorStore = useEditorStore();
</script>

<template>
  <div v-if="editorStore.isInDatabase" class="algorithm-manager">
    <v-btn>Duplicate</v-btn>
    <v-btn>Save</v-btn>
    <v-btn>Delete</v-btn>
    <v-btn>Mark as favourite</v-btn>
  </div>
</template>

<style scoped></style>
