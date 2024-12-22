<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';

interface Props {
  uuid: string;
  title: string;
  tags: string[];
}

const props = defineProps<Props>();

const userStore = useUserStore();
const editorStore = useEditorStore();

const openAlgorithm = () => {
  const algorithm = userStore.algorithms.find(
    (algorithm) => algorithm.uuid === props.uuid
  );

  if (!algorithm) {
    throw new Error(`Cannot find algorithm of uuid ${props.uuid}`);
  }
  editorStore.isInDatabase = true;
  editorStore.uuid = algorithm.uuid;

  editorStore.code = algorithm.code;
  editorStore.title = algorithm.title;

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
