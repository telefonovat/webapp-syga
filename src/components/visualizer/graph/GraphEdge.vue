<script setup lang="ts">
  import { defaultEdgeSettings } from "./defaults";
  import { computed } from "vue";

  interface Props {
    id: string;
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
    color: "#555555", // Grey
    shape: "solid",
    width: 3,
    isDirected: false,
  });

  const outlineColor = "black";

  const arrowheadId = `arrowhead-${props.id}`;
  //stroke-dasharray to pass to svg line
  const strokeDashArray = computed(() => {
    switch (props.shape) {
      case "dashed":
        return "6 6";
      case "dotted":
        return "2 6";
      default:
        return "0 0";
    }
  });
</script>

<template>

  <g class="edge">

    <defs>

      <marker
        :id="arrowheadId"
        markerWidth="4"
        markerHeight="4"
        refX="9"
        refY="2"
        orient="auto">

        <path
          d="M 0 0 L 4 2 M 0 4 L 4 2"
          :stroke="outlineColor"
          stroke-width="2" />

        <path
          d="M 0 0 L 4 2 M 0 4 L 4 2"
          :stroke="color"
          stroke-width="1" />

      </marker>

    </defs>

    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :stroke="outlineColor"
      :stroke-width="width + 2"
      :stroke-dasharray="strokeDashArray" />

    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      :stroke="color"
      :stroke-width="width"
      :stroke-dasharray="strokeDashArray"
      :marker-end="isDirected ? `url(#${arrowheadId})` : undefined" />

    <text :x="(x1 + x2) / 2" :y="(y1 + y2) / 2">{{ label }}</text>

  </g>

</template>

<style scoped></style>

