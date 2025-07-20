<script setup lang="ts">
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  type ConsoleOutput = [log: string, metaInfo: string];

  const visualizerStore = useVisualizerStore();

  const { frames, activeFrameNumber } = storeToRefs(visualizerStore);

  const processedFrames = computed(() =>
    frames.value.slice(0, activeFrameNumber.value + 1),
  );

  const consoleOutputs = computed<ConsoleOutput[]>(() => {
    const outputs: ConsoleOutput[] = [];
    for (const frame of processedFrames.value) {
      if (frame.consoleLogs === "") {
        continue;
      }

      const metaInfo =
        frame.lineNo.length === 1
          ? `Line ${frame.lineNo[0]}`
          : `Lines ${frame.lineNo.join(" ")}`;
      outputs.push([frame.consoleLogs, metaInfo]);
    }
    return outputs;
  });
</script>

<template>

  <v-container class="visualizer-console ma-0 pa-0">

    <template v-for="output in consoleOutputs">

      <v-container
        class="d-flex"
        style="background-color: rgba(0, 0, 0, 0.1)">

        <pre>{{ output[0] }}</pre>

        <v-spacer />

        <span>{{ output[1] }}</span>

      </v-container>

    </template>

  </v-container>

</template>

<style scoped>
  .visualizer-console{
  height: 25%;
  overflow-y: auto;
}
</style>

