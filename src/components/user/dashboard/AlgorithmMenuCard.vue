<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';
import { ref } from 'vue';

import DeleteAlgorithmPopUp from '../algorithm/DeleteAlgorithmPopUp.vue';
import MarkFavouriteButton from '../algorithm/MarkFavouriteButton.vue';

interface Props {
  uuid: string;
  title: string;
  tags: string[];
  isStarred: boolean;
}

const props = defineProps<Props>();

const userStore = useUserStore();
const editorStore = useEditorStore();

const dialogState = ref({
  deleteAlgorithm: false,
  isLinkCopied: false,
});

const openAlgorithm = () => {
  const algorithm = userStore.algorithms.find(
    (algorithm) => algorithm.uuid === props.uuid
  );

  if (!algorithm) {
    throw new Error(`Cannot find algorithm of uuid ${props.uuid}`);
  }

  editorStore.$patch({
    isInDatabase: true,
    uuid: algorithm.uuid,
    code: algorithm.code,
    title: algorithm.title,
    isStarred: algorithm.isStarred,
  });
  router.replace('/');
};

const copyLink = () => {
  navigator.clipboard.writeText(
    `${window.location.origin}/algorithms/detail/${props.uuid}`
  );

  dialogState.value.isLinkCopied = true;
};
</script>

<template>
  <v-card>
    <!-- Snackbar for copied link feedback -->
    <v-snackbar v-model="dialogState.isLinkCopied">
      Copied link to clipboard
    </v-snackbar>

    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn @click="openAlgorithm()">Open</v-btn>
      <DeleteAlgorithmPopUp :title="title" :uuid="uuid">
        Delete
      </DeleteAlgorithmPopUp>
      <v-btn @click="copyLink()">Share</v-btn>
      <MarkFavouriteButton :uuid="uuid" :is-starred="isStarred" />
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
