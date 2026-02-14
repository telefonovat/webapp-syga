<script setup lang="ts">
  import { Separator } from "reka-ui";

  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { VisualizationFrame } from "@telefonovat/syga--contract";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  type ConsoleOutput = [log: string, metaInfo: string];

  const visualizerStore = useVisualizerStore();

  const { frames, activeFrameNumber } = storeToRefs(visualizerStore);

  const processedFrames = computed(() =>
    frames.value.slice(0, activeFrameNumber.value + 1),
  );

  function formatMetaInfo(frame: VisualizationFrame): string {
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
      if (frame.consoleLogs.length === 0) {
        continue;
      }
      if (
        frame.consoleLogs.length === 1 &&
        frame.consoleLogs[0] === ""
      ) {
        continue;
      }

      const metaInfo = formatMetaInfo(frame);
      outputs.push([frame.consoleLogs.join("\n"), metaInfo]);
    }
    return outputs;
  });
</script>

<template>

  <div class="visualizer-console ma-0 pa-0">

    <template v-for="(output, index) in consoleOutputs">

      <Separator
        v-if="index > 0"
        class="bg-stone-300/50 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-1/2 data-[orientation=horizontal]:mx-auto data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-3" />

      <div class="console-card pt-3 pb-3">

        <pre class="console-logs pl-4">{{ output[0] }}</pre>

        <span class="meta-info pr-4">{{ output[1] }}</span>

      </div>

    </template>

  </div>

</template>

<style lang="postcss" scoped>
  .visualizer-console{
  overflow-y: scroll;
}

.console-card{
  display: flex;
}

.console-logs{
  margin-right: auto;
}

.meta-info{
  margin-left: auto;
}
</style>

