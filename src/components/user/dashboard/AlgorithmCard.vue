<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { deleteUserAlgorithm } from '@/api/connector';
import { useUserStore } from '@/store/user/userStore';
import { ref } from 'vue';

interface Props {
  uuid: string;
  title: string;
  tags: string[];
}

const props = defineProps<Props>();

const userStore = useUserStore();
const editorStore = useEditorStore();

const deleteAlgorithmDialog = ref(false);
const isAlgorithmLinkCopied = ref(false);

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

const deleteAlgorithm = () => {
  userStore.algorithms = userStore.algorithms.filter(
    (algorithm) => algorithm.uuid !== props.uuid
  );

  deleteUserAlgorithm(props.uuid);
};

const copyLink = () => {
  navigator.clipboard.writeText(
    `${window.location.origin}/algorithms/detail/${props.uuid}`
  );

  isAlgorithmLinkCopied.value = true;
};
</script>

<template>
  <v-card>
    <v-snackbar v-model="isAlgorithmLinkCopied">
      Copied link to clipboard
    </v-snackbar>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn @click="openAlgorithm()">Open</v-btn>
      <v-btn @click="deleteAlgorithmDialog = true">Delete</v-btn>
      <v-btn @click="copyLink()">Share</v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="deleteAlgorithmDialog" max-width="320">
    <v-card>
      <v-card-text>
        Are you sure you want to delete {{ props.title }}?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteAlgorithmDialog = false">No</v-btn>
        <v-btn
          @click="
            deleteAlgorithm();
            deleteAlgorithmDialog = false;
          "
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
