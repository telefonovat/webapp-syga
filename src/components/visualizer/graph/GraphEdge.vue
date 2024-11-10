<script setup lang="ts">
import { onMounted } from 'vue';
import { defaultEdgeSettings } from './defaults';

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  shape?: string;
  width?: number;
}

const props_ = withDefaults(defineProps<Props>(), {
  color: defaultEdgeSettings['color'] as string,
  shape: defaultEdgeSettings['shape'] as string,
  width: defaultEdgeSettings['width'] as number,
});
</script>

<template>
  <g class="edge">
    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :stroke="color"
      :stroke-width="width"
    />
  </g>
</template>

<style scoped></style>
