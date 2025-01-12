<script setup lang="ts">
import {
  saveUserAlgorithm,
  updateUserAlgorithm,
} from '@/api/connector';
import { Algorithm } from '@/shared-types/user/Algorithm';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';
import { ref } from 'vue';
import SimpleMessagePopup from '@/components/utility/SimpleMessagePopup.vue';

interface Props {
  defaultTitle?: string;
  duplicate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultTitle: '',
  duplicate: false,
});

const editorStore = useEditorStore();
const userStore = useUserStore();

const dialog = ref(false);

const title = ref(props.defaultTitle);
const isPublic = ref(false);
const isStarred = ref(false);

const isExistingAlgorithmUpdated = ref(false);

const handleClick = () => {
  if (userStore.username === null) {
    throw new Error('Please log in first');
  }
  const algorithmUpdate: Partial<Algorithm> = {
    code: editorStore.code,
  };
  if (editorStore.isInDatabase && !props.duplicate) {
    updateUserAlgorithm(editorStore.uuid!, algorithmUpdate).catch(
      (error) => console.warn(error)
    );
    isExistingAlgorithmUpdated.value = true;
  } else {
    dialog.value = true;
  }
};
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
  <SimpleMessagePopup
    message="Algorithm updated"
    :is-visible="isExistingAlgorithmUpdated"
  />
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn @click="handleClick">
        <slot />
      </v-btn>
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
