<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';

const editorStore = useEditorStore();

function closeAlgorithm() {
  //Closes current algorithm and reroutes to an empty sheet
  editorStore.$reset();
  router.replace('/');
}
</script>

<template>
  <div v-if="editorStore.isInDatabase" class="algorithm-manager">
    <v-btn>Duplicate</v-btn>
    <v-btn>Save</v-btn>
    <v-btn>Delete</v-btn>
    <v-btn @click="closeAlgorithm()">Close</v-btn>
    <v-btn>Mark as favourite</v-btn>
  </div>
</template>

<style scoped></style>
