import { computed, ref } from "vue";
import { useVisualizerStore } from "@/stores/visualizer";
import { storeToRefs } from "pinia";

export function useEditorVisuals(ancestorClass: string) {
  const highlightEnabled = ref(true);
  const { activeLines } = storeToRefs(useVisualizerStore());
  const highlightStyle = computed(() => {
    if (!highlightEnabled || !activeLines) {
      return "";
    }
    return activeLines.value
      .map(line => `
                .${ancestorClass} >>> .cm-line:nth-of-type(${line}){
                  background-color: red;
                }`)
      .join('\n');
  });
  return {
    highlightStyle
  }
}
