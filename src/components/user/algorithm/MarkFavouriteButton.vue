<script setup lang="ts">
import { updateUserAlgorithm } from '@/api/connector';
import { useUserStore } from '@/store/user/userStore';
import { computed } from 'vue';
interface Props {
  uuid: string;
  isStarred: boolean;
}

const props = defineProps<Props>();

const userStore = useUserStore();

const toggleFavourite = async () => {
  const localBody = userStore.algorithms.find(
    (algorithm) => algorithm.uuid === props.uuid
  );

  if (localBody === undefined) {
    throw new Error('Cannot find algorithm with uuid');
  }

  await updateUserAlgorithm(props.uuid, {
    isStarred: !localBody.isStarred,
  });

  localBody.isStarred = !localBody.isStarred;
};
</script>

<template>
  <v-btn @click="toggleFavourite()">
    <v-icon v-if="isStarred" icon="mdi-heart" />
    <v-icon v-else icon="mdi-heart-outline" />
  </v-btn>
</template>

<style scoped></style>
