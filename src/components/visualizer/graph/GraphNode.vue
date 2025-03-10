<script setup lang="ts">
import { Node } from '@/shared-types/visualization/Node';
import { defaultNodeSettings } from './defaults';

interface Props {
  x: number;
  y: number;
  label: Node;
  color?: string;
  shape?: string;
  radius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  //Is this dangerous?
  color: defaultNodeSettings['color'] as string,
  shape: defaultNodeSettings['shape'] as string,
  radius: defaultNodeSettings['radius'] as number,
});
</script>

<template>
  <g class="node" role="img">
    <circle
      v-if="shape === 'circle'"
      :cx="x"
      :cy="y"
      :r="radius"
      :fill="color"
    />
    <rect
      v-if="shape === 'square'"
      :x="x - radius"
      :y="y - radius"
      :width="radius * 2"
      :height="radius * 2"
      :fill="color"
    />
    <text
      :x="x"
      :y="y"
      text-anchor="middle"
      dominant-baseline="middle"
    >
      {{ label }}
    </text>
  </g>
</template>

<style scoped></style>
