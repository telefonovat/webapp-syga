<script setup lang="ts">
import { onMounted } from 'vue';
import { defaultEdgeSettings } from './defaults';
import { computed } from 'vue';

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

//stroke-dasharray to pass to svg line
const strokeDashArray = computed(() => {
  switch (props_.shape) {
    case 'dashed':
      return '6 6';
    case 'dotted':
      return '2 6';
    default:
      return '0 0';
  }
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
      :stroke-dasharray="strokeDashArray"
    />
  </g>
</template>

<style scoped></style>
