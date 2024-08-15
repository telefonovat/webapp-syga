<script setup lang="ts">
//Default values
const DEFAULT_COLOR = "#3498db";
const DEFAULT_RADIUS = 30;
//Props
interface Props {
  x: number, y: number,
  label: string | number,
  shape?: string
}
withDefaults(
  defineProps<Props>(),
  {
    shape: () => "circle",
  }
);
</script>
<template>
  <g class="node">
    <circle v-if="shape === 'circle'" :cx="x" :cy="y" :r="DEFAULT_RADIUS" :fill="DEFAULT_COLOR">
    </circle>
    <text :x="x" :y="y" text-anchor="middle">
      {{ label }}
    </text>
  </g>
</template>

<style scoped>
.node {
  transform-origin: center;
  transform-box: fill-box;
  transition: 1s;
}

.node:hover {
  transform: scale(1.2);

  circle {
    fill: red;
  }
}
</style>
