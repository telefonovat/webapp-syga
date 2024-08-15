<script setup lang="ts">
import { ref } from 'vue';

import Frame from "@/interfaces/backend/Frame";

import { useVisualizerStore } from '@/stores/visualizer';
import { storeToRefs } from 'pinia';

const store = useVisualizerStore();

const { currentFrame } = storeToRefs(store);
</script>

<template>
</template>

<style scoped></style>
