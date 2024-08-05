/*
* Reusable splitting component
* */
<script setup lang="ts">

/*
* TODO:
* > Props validation
* > Save state
*/
//Imports
import { ref, onMounted, computed } from "vue";
import Split from "split.js";
//Default values
const DEFAULT_GUTTER_SIZE = 10;

const splitContainer = ref<HTMLElement | null>(null);

interface Props {
  direction?: "horizontal" | "vertical",
  gutterSize?: number,
  initialSizes: number[],
};

const props = withDefaults(
  defineProps<Props>(),
  {
    direction: "horizontal",
    gutterSize: DEFAULT_GUTTER_SIZE,
  }
)

onMounted(() => {
  if (splitContainer.value) {
    const children = Array.from(splitContainer.value.children) as HTMLElement[];
    Split(children, {
      direction: props.direction,
      sizes: props.initialSizes,
      gutterSize: props.gutterSize,
    })
  }
})

//For correct rendering
const flexDirection = computed(
  () => props.direction === "horizontal" ? "row" : "column",
);
const computedStyle = computed(() => {
  return {
    "flex-direction": props.direction === "horizontal" ? "row" : "column",
  };
});
</script>

<template>
  <div :style="computedStyle" ref="splitContainer" class="split-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.split-container {
  display: flex;
  max-height: 100%;
  max-width: 100%;
}
</style>

/*
* Gutters are global so scoped styles won't work
*/
<style>
.gutter {
  color: red;
  background-color: red;
}

.gutter:hover {
  cursor: grab;
}
</style>
