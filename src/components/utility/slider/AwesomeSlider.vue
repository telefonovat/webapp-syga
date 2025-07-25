<script setup lang="ts">
  import { computed } from "vue";
  import AwesomeSliderPresentationBar from "./AwesomeSliderPresentationBar.vue";
  import type { AwesomeSliderModel } from "./AwesomeSliderModel";

  interface AwesomeSliderProps {
    color?: string;
  }

  const model = defineModel<AwesomeSliderModel>({ required: true });

  const props = withDefaults(defineProps<AwesomeSliderProps>(), {
    color: "darkcyan",
  });

  const positionPercentage = computed(() =>
    Math.round(
      ((model.value.value - model.value.min) /
        (model.value.max - model.value.min)) *
        100,
    ),
  );

  const displayText = computed(
    () => `${model.value.value}/${model.value.max}`,
  );
</script>

<template>

  <AwesomeSliderPresentationBar
    :position-percentage="positionPercentage"
    :color="props.color"
    :text="displayText" />

</template>

