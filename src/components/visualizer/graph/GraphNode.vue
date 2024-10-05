<script setup lang="ts">
import Node from '@/shared/Node';
import { withDefaults } from 'vue';
import { defaultNodeSettings } from './defaults';

interface Props {
  x: number, y: number,
  label: Node,
  color?: string,
  shape?: string,
  radius?: number,
};

const props_ = withDefaults(
  defineProps<Props>(),
  {
    //Is this dangerous?
    color: defaultNodeSettings["color"] as string,
    shape: defaultNodeSettings["shape"] as string,
    radius: defaultNodeSettings["radius"] as number,
  }
);
</script>

<template>
  <g class="node">
    <circle v-if="shape === 'circle'" :cx="x" :cy="y" :r="radius" :fill="color">
    </circle>
    <text :x="x" :y="y" text-anchor="middle">
      {{ label }}
    </text>
  </g>
</template>

<style scoped></style>
