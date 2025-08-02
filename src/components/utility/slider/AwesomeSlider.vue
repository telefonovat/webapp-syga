<script setup lang="ts">
  import { computed, ref } from "vue";
  import AwesomeSliderPresentationBar from "./AwesomeSliderPresentationBar.vue";
  import type { AwesomeSliderModel } from "./AwesomeSliderModel";

  interface AwesomeSliderProps {
    color?: string;
    disabled?: boolean;
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

  const sliderBarComponent = ref<InstanceType<
    typeof AwesomeSliderPresentationBar
  > | null>(null);

  function handleDrag(event: MouseEvent) {
    if (props.disabled) return;
    if (
      event.type === "mousemove" &&
      (event.buttons === undefined
        ? event.which !== 1
        : event.buttons !== 1)
    )
      return;

    const bar = sliderBarComponent.value?.sliderBar;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const width = rect.width || 1;

    const percentage = Math.min(1, Math.max(0, relativeX / width));
    const newValue =
      model.value.min +
      Math.round(percentage * (model.value.max - model.value.min));

    model.value.value = newValue;
  }
</script>

<template>

  <AwesomeSliderPresentationBar
    :style="
      props.disabled
        ? { backgroundColor: '#666', cursor: 'not-allowed' }
        : {}
    "
    ref="sliderBarComponent"
    @mousedown="handleDrag"
    @mousemove="handleDrag"
    :position-percentage="positionPercentage"
    :color="props.color"
    :text="displayText" />

</template>

