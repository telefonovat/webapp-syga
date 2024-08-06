<script setup lang="ts">
//Default values
const DEFAULT_COLOR = "black";
const DEFAULT_RADIUS = 30;
const DEFAULT_SHAPE = "circle";

//Props
interface Props {
  x: number, y: number,
  label: string | number,
  color?: string,
  shape?: string
  radius?: number,
}

withDefaults(
  defineProps<Props>(),
  {
    color: DEFAULT_COLOR,
    shape: DEFAULT_SHAPE,
    radius: DEFAULT_RADIUS,
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

<style scoped>
.node {
  transform-origin: center;
  transform-box: fill-box;
  transition: 1s;
}

.node:hover {
  transform: scale(1.2);

}
</style>
