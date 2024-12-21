<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';

interface Props {
  title: string;
  tags: string[];
}

defineProps<Props>();

const editorStore = useEditorStore();

const openAlgorithm = () => {
  editorStore.code = 'print("Hello world")';
  editorStore.isInDatabase = true;

  router.replace('/');
};
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn @click="openAlgorithm()">Open</v-btn>
      <v-btn>Delete</v-btn>
      <v-btn>Share</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
