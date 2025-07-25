<script setup lang="ts">
  import { Frame } from "@/shared-types/visualization/Frame";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { format } from "path";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  type ConsoleOutput = [log: string, metaInfo: string];

  const visualizerStore = useVisualizerStore();

  const { frames, activeFrameNumber } = storeToRefs(visualizerStore);

  const processedFrames = computed(() =>
    frames.value.slice(0, activeFrameNumber.value + 1),
  );

  function formatMetaInfo(frame: Frame): string {
    if (frame.lineNo.length === 0) {
      return "---";
    }
    if (frame.lineNo.length === 1) {
      return `Line ${frame.lineNo[0]}`;
    }
    return `Lines ${frame.lineNo.join(" ")}`;
  }

  const consoleOutputs = computed<ConsoleOutput[]>(() => {
    const outputs: ConsoleOutput[] = [];
    for (const frame of processedFrames.value) {
      if (frame.consoleLogs === "") {
        continue;
      }

      const metaInfo = formatMetaInfo(frame);
      outputs.push([frame.consoleLogs, metaInfo]);
    }
    return outputs;
  });
</script>

<template>

  <div class="visualizer-console ma-0 pa-0">

    <template v-for="output in consoleOutputs">

      <div
        class="d-flex"
        style="background-color: rgba(0, 0, 0, 0.1)">

        <pre class="console-logs">{{ output[0] }}</pre>

        <span class="meta-info">{{ output[1] }}</span>

      </div>

    </template>

  </div>

</template>

<style scoped>
  .visualizer-console{
  height: 25%;
  overflow-y: auto;
}

.console-logs{
  margin-right: auto;
  padding-left: 0.5rem;
}

.meta-info{
  margin-left: auto;
  padding-right: 0.5rem;
}
</style>

