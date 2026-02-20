<template>

  <div class="flex flex-col">

    <div class="h-9/10">

      <ImmediateFeedbackPredictView
        class="h-full"
        v-model:component="blankComponent"
        v-if="isCurrent('predict')" />

      <div v-if="isCurrent('reveal')">Reveal</div>

      <div v-if="isCurrent('code')">Code</div>

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
          @click="goToNext"
          class="btn-primary flex items-center">
           Next
          <Icon icon="weui:previous2-outlined" class="size-10" />

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

  import { Icon } from "@iconify/vue";
  import { useStepper } from "@vueuse/core";
  import { ToolbarRoot, ToolbarButton } from "reka-ui";
  import { useImmediateFeedbackData } from "./useImmediateFeedbackData";
  import { onMounted } from "vue";

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

  const { code, solutionComponent, blankComponent } =
    await useImmediateFeedbackData();

  onMounted(() => console.log("Nice"));
</script>

