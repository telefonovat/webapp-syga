<script setup lang="ts">
  import { Node } from "@telefonovat/syga--contract";
  import { usePreferencesContent } from "@/components/settings/preferences/usePreferencesContent";

  interface Props {
    x: number;
    y: number;
    label: Node;
    color?: string;
    shape?: string;
    radius?: number;
  }

  withDefaults(defineProps<Props>(), {
    //Is this dangerous?
    color: "#555",
    shape: "circle",
    radius: 15,
  });

  const { isVertexThemeWhite } = usePreferencesContent();
</script>

<template>

  <g role="img" :aria-label="label as string">

    <circle
      v-if="shape === 'circle'"
      :cx="x"
      :cy="y"
      :r="radius"
      :stroke="isVertexThemeWhite ? 'white' : 'black'"
      stroke-width="1"
      :fill="color" />

    <rect
      v-if="shape === 'square'"
      :x="x - radius"
      :y="y - radius"
      :width="radius * 2"
      :height="radius * 2"
      :stroke="isVertexThemeWhite ? 'white' : 'black'"
      stroke-width="1"
      :fill="color" />

    <text
      class="text-base"
      v-if="label.toString().length <= 3"
      :x="x"
      :y="y"
      :fill="isVertexThemeWhite ? 'white' : 'black'"
      text-anchor="middle"
      dominant-baseline="middle">
       {{ label }}
    </text>

    <text
      class="text-xs"
      v-else
      :x="x"
      :y="y"
      :fill="isVertexThemeWhite ? 'white' : 'black'"
      text-anchor="middle"
      dominant-baseline="middle">
       {{ label }}
    </text>

  </g>

</template>

<style scoped></style>

