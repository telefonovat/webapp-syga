<script setup lang="ts">
import { saveUserAlgorithm } from '@/api/connector';
import { Algorithm } from '@/shared-types/user/Algorithm';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';
import { ref } from 'vue';

const editorStore = useEditorStore();
const userStore = useUserStore();

const dialog = ref(false);

const title = ref('');
const isPublic = ref(false);
const isStarred = ref(false);

function saveAlgorithm() {
  if (userStore.username === null) {
    throw new Error('Please log in first');
  }
  const algorithm: Omit<Algorithm, 'uuid'> = {
    title: title.value,
    creatorUsername: userStore.username,
    code: editorStore.code,
    tags: [],
    isPublic: isPublic.value,
    isStarred: isStarred.value,
  };
  saveUserAlgorithm(algorithm)
    .then(() => {})
    .catch((error) => {
      console.warn(error);
    })
    .finally(() => {
      dialog.value = false;
    });
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps">Save</v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-text-field v-model="title" label="Title*" required />
        <v-checkbox v-model="isPublic" label="Make it public" />
        <v-checkbox v-model="isStarred" label="Add to favourites" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = false">Cancel</v-btn>
        <v-btn @click="saveAlgorithm()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
