<script setup lang="ts">
import { onMounted } from 'vue';
import { defaultEdgeSettings } from './defaults';
import { computed } from 'vue';

interface Props {
  index: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  shape?: string;
  width?: number;
  label?: string;
  isDirected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: defaultEdgeSettings['color'] as string,
  shape: defaultEdgeSettings['shape'] as string,
  width: defaultEdgeSettings['width'] as number,
  isDirected: defaultEdgeSettings['isDirected'] as boolean,
});

const arrowheadId = `arrowhead-${props.index}`;
//stroke-dasharray to pass to svg line
const strokeDashArray = computed(() => {
  switch (props.shape) {
    case 'dashed':
      return '6 6';
    case 'dotted':
      return '2 6';
    default:
      return '0 0';
  }
});

onMounted(() => {
  // console.log(`directed : ${props.isDirected}`);
  // console.log(arrowheadId);
});
</script>

<template>
  <g class="edge">
    <defs>
      <marker
        :id="arrowheadId"
        markerWidth="3"
        markerHeight="3"
        refX="6"
        refY="1.75"
        orient="auto"
        :fill="color"
      >
        <polygon points="0 0, 4 2, 0 3.5" />
      </marker>
    </defs>
    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :stroke="color"
      :stroke-width="width"
      :stroke-dasharray="strokeDashArray"
      :marker-end="isDirected ? `url(#${arrowheadId})` : undefined"
    />
    <text :x="(x1 + x2) / 2" :y="(y1 + y2) / 2">{{ label }}</text>
  </g>
</template>

<style scoped></style>
