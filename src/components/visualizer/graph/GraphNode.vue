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
      stroke="white"
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

    <g v-else>

      <rect
        :x="x - 65"
        :y="y - 30"
        width="130"
        :fill="color"
        height="26"
        :stroke="isVertexThemeWhite ? 'white' : 'black'"
        stroke-width="1" />

      <text
        class="text-base"
        :x="x"
        :y="y - 20"
        :fill="isVertexThemeWhite ? 'white' : 'black'"
        text-anchor="middle"
        dominant-baseline="middle"
        text-length="100">
         {{ label }}
      </text>

    </g>

  </g>

</template>

<style scoped></style>

