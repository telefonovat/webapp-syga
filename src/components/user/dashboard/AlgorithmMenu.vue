<script setup lang="ts">
import { getUserAlgorithms } from '@/api/connector';
import AlgorithmCard from './AlgorithmMenuCard.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user/userStore';
import { computed } from 'vue';

const userStore = useUserStore();

const algorithms = computed(() => userStore.algorithms);
onMounted(() => {
  refresh();
});

function refresh() {
  getUserAlgorithms().then((retrievedAlgorithms) => {
    userStore.algorithms = retrievedAlgorithms;
  });
}
</script>

<template>
  <div class="algorithm-menu">
    <!-- <v-btn @click="refresh()">Refresh</v-btn> -->
    <v-card title="Algorithms" />
    <template v-for="algorithm in algorithms">
      <v-divider />
      <AlgorithmCard
        :uuid="algorithm.uuid"
        :title="algorithm.title"
        :tags="algorithm.tags"
        :is-starred="algorithm.isStarred"
      />
    </template>
  </div>
</template>

<style scoped></style>
