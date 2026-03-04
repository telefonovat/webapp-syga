<template>

  <div class="flex flex-col">

    <div class="h-9/10">

      <ImmediateFeedbackPredictView
        class="h-full"
        :edgeColorChoices="edgeColorChoices"
        v-model:component="blankComponent"
        v-if="isCurrent('predict')" />

      <div class="h-full" v-if="isCurrent('reveal')">

        <ImmediateFeedbackRevealView
          :solution="solutionComponent"
          :userSubmitted="blankComponent" />

      </div>

      <div class="h-full" v-if="isCurrent('code')">

        <ImmediateFeedbackCodeView :code="code" />

      </div>

    </div>

    <!-- Flow control -->

    <div class="h-1/10 border-top flex m-auto">

      <Separator
        class="bg-stone-300/50 self-center data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-3/4 data-[orientation=vertical]:w-px mx-[15px]"
        decorative
        orientation="vertical" />

      <ToolbarRoot class="flex">

        <ToolbarButton
          @click="goToPrevious"
          class="btn-primary flex items-center">
           Back
          <Icon
            icon="material-symbols:next-plan-outline"
            class="size-10" />

        </ToolbarButton>

        <ToolbarButton
          @click="router.replace('/')"
          class="btn-primary flex items-center">
           Home
          <Icon icon="mdi:home-circle-outline" class="size-10" />

        </ToolbarButton>

        <ToolbarButton
          :disabled="isCurrent('predict') && !isSolutionComplete"
          @click="goToNext"
          class="btn-primary flex items-center">
           Next
          <Icon
            icon="weui:previous2-outlined"
            class="size-10 disabled:opacity-75" />

        </ToolbarButton>

      </ToolbarRoot>

      <Separator
        class="bg-stone-300/50 self-center data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-3/4 data-[orientation=vertical]:w-px mx-[15px]"
        decorative
        orientation="vertical" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import ImmediateFeedbackPredictView from "./ImmediateFeedbackPredictView.vue";
  import ImmediateFeedbackRevealView from "./ImmediateFeedbackRevealView.vue";
  import ImmediateFeedbackCodeView from "./ImmediateFeedbackCodeView.vue";

  import { ToolbarRoot, ToolbarButton } from "reka-ui";

  import { Icon } from "@iconify/vue";
  import { useStepper } from "@vueuse/core";
  import { useImmediateFeedbackData } from "./useImmediateFeedbackData";
  import { router } from "@/router";
  import { computed } from "vue";

  const { isCurrent, goToNext, goToPrevious } = useStepper({
    predict: {
      title: "Predict",
    },
    reveal: {
      title: "Reveal",
    },
    code: {
      title: "Code",
    },
  });

  const {
    code,
    edgeColorChoices,
    blankComponent,
    solutionComponent,
  } = await useImmediateFeedbackData();
  const isSolutionComplete = computed<boolean>(() => {
    const filledColors = blankComponent.value.edges.map(
      ({ start, end }) =>
        blankComponent.value.style.edgeColors[start.id][end.id],
    );
    return filledColors.every((c) => c !== "#AAAAAA" && c !== null);
  });
</script>

