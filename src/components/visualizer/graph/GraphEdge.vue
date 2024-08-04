<script setup lang="ts">
const DEFAULT_COLOR = "#aaa";
const DEFAULT_SHAPE = "solid";
const DEFAULT_WIDTH = 10;

interface Props {
  x1: number, y1: number,
  x2: number, y2: number,
  color?: string,
  shape?: string,
}
withDefaults(defineProps<Props>(),
  {
    color: DEFAULT_COLOR,
    shape: DEFAULT_SHAPE,
  }
)
</script>

<template>
  <g class="edge">
    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" :stroke="color" :stroke-width="DEFAULT_WIDTH" />
  </g>
</template>

<style scoped>
.edge {
  transform-origin: center;
  transform-box: fill-box;
  transition: 0.5s;
}

.edge:hover {
  transform: scale(1.2);
}
</style>
