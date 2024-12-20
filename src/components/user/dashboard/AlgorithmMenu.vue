<script setup lang="ts">
import { getUserAlgorithms } from '@/api/connector';
import { Algorithm } from '@/shared-types/user/Algorithm';
import AlgorithmCard from './AlgorithmCard.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

const algorithms = ref<Algorithm[]>([]);
onMounted(() => {});

async function refresh() {
  algorithms.value = await getUserAlgorithms();
}
</script>

<template>
  <div class="algorithm-menu">
    <v-btn @click="refresh()">Refresh</v-btn>
    <h1>Hello</h1>
    <v-card title="Algorithms" />
    <AlgorithmCard
      v-for="algorithm in algorithms"
      :title="algorithm.title"
      :tags="algorithm.tags"
    />
  </div>
</template>

<style scoped></style>
