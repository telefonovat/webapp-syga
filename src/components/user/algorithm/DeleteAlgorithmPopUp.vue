<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/user/userStore';
import { useEditorStore } from '@/store/editor/editorStore';
import { deleteUserAlgorithm } from '@/api/connector';
interface Props {
  title: string;
  uuid: string;
}

const props = defineProps<Props>();
const dialogState = ref({
  deleteAlgorithm: false,
});

const userStore = useUserStore();
const editorStore = useEditorStore();

const deleteAlgorithm = () => {
  userStore.algorithms = userStore.algorithms.filter(
    (algorithm) => algorithm.uuid !== props.uuid
  );

  if (editorStore.uuid === props.uuid) {
    editorStore.$reset();
  }

  deleteUserAlgorithm(props.uuid);
};
</script>

<template>
  <v-btn @click="dialogState.deleteAlgorithm = true">Delete</v-btn>
  <v-dialog v-model="dialogState.deleteAlgorithm" max-width="320">
    <v-card>
      <v-card-text>
        Are you sure you want to delete {{ title }}?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialogState.deleteAlgorithm = false">No</v-btn>
        <v-btn
          @click="
            deleteAlgorithm();
            dialogState.deleteAlgorithm = false;
          "
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
