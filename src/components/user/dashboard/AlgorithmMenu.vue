<script setup lang="ts">
import { getUserAlgorithms } from '@/api/connector';
import { Algorithm } from '@/shared-types/user/Algorithm';
import AlgorithmCard from './AlgorithmCard.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user/userStore';

const userStore = useUserStore();

const algorithms = ref<Algorithm[]>([]);
onMounted(() => {
  refresh();
});

function refresh() {
  getUserAlgorithms().then((retrievedAlgorithms) => {
    algorithms.value = retrievedAlgorithms;

    userStore.algorithms = algorithms.value;
  });
}
</script>

<template>
  <div class="algorithm-menu">
    <v-btn @click="refresh()">Refresh</v-btn>
    <v-card title="Algorithms" />
    <AlgorithmCard
      v-for="algorithm in algorithms"
      :uuid="algorithm.uuid"
      :title="algorithm.title"
      :tags="algorithm.tags"
    />
  </div>
</template>

<style scoped></style>
