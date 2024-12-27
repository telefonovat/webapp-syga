<script setup lang="ts">
import { User } from '@/shared-types/user/Authentication';
import { getUserPublicAlgorithms } from '@/api/connector';
import { onMounted, ref } from 'vue';
import { Algorithm } from '@/shared-types/user/Algorithm';
interface Props {
  username: User['username'];
}

const props = defineProps<Props>();

const userPublicAlgorithms = ref<Algorithm[]>([]);

onMounted(async () => {
  userPublicAlgorithms.value = await getUserPublicAlgorithms(
    props.username
  );
  console.log(userPublicAlgorithms.value);
});
</script>

<template>
  <v-card v-for="algorithm in userPublicAlgorithms">
    <v-card-title>{{ algorithm.title }}</v-card-title>
    <v-card-actions>
      <v-btn>Fork</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
