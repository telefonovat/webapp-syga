<script setup lang="ts">
  import { ref, computed } from "vue";

  interface AwesomeSliderPresentationProps {
    positionPercentage: number;
    color?: string;
    text: string;
  }

  const props = withDefaults(
    defineProps<AwesomeSliderPresentationProps>(),
    {
      type: "default",
      color: "darkcyan",
    },
  );

  const positionPercentageFormatted = computed(
    () => `${props.positionPercentage}%`,
  );

  const sliderBar = ref<HTMLElement | null>(null);
  defineExpose({ sliderBar });
</script>

<template>

  <div ref="sliderBar" class="slider-bar">{{ text }}</div>

</template>

<style scoped>
  .slider-bar {
  background: linear-gradient(
    90deg,
    v-bind(color) 0%,
    v-bind(color) v-bind(positionPercentageFormatted),
    transparent v-bind(positionPercentageFormatted),
    transparent 100%
  );
  text-align: center;
}
</style>

