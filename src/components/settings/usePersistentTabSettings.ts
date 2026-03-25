import { useStorage } from "@vueuse/core";
import { reactive, ref, watch } from "vue";
import { diffLines, ChangeObject } from "diff";

const helloWorldCode = `text = 'hello, stranger!'
G = engine.DiGraph([(i + 1, i + 2) for i in range(len(text) - 1)])\n
G.color_edges_by(lambda u, v, G: v if 'label' in G.nodes[v] else None)
G.color_nodes_by(lambda v, G: v if 'label' in G.nodes[v] else None)
G.label_nodes_by(lambda v, G: G.nodes[v]['label'] if 'label' in G.nodes[v] else ' ')\n
for i, symbol in enumerate(text):
  G.nodes[(i + 1)]['label'] = symbol
print(text)`;

function extractTabId(url: string): string {
  const matches = url.match(/\/exercise\/(.+)/);
  if (matches && matches.length > 1) {
    return matches[1];
  } else {
    return "home";
  }
}
const sources = reactive<Record<string, string>>({});

export function usePersistentTabSettings(url: string) {
  const tabId = extractTabId(url);

  const localStorageId = `${tabId}-tab-settings`;

  const source = ref(sources[url] ?? helloWorldCode);
  const code = useStorage(`${localStorageId}--code`, helloWorldCode);
  watch(source, () => {
    sources[url] = source.value;
  });
  watch(sources, () => {
    source.value = sources[url];
  });

  const isCodeDirty = useStorage(`${localStorageId}--dirty`, false);
  function markClean() {
    isCodeDirty.value = false;
  }
  watch(code, () => {
    if (isCodeDirty.value === false) isCodeDirty.value = true;
  });

  const lineDiffs = ref<ChangeObject<string>[]>([]);
  const modifiedLineNos = ref<Set<number>>(new Set());
  function calculateLineDiffs() {
    lineDiffs.value = diffLines(source.value, code.value);

    const modified = new Set<number>();
    let offset = 0; // The first valid number is 1
    for (const change of lineDiffs.value) {
      const lineCount = change.value.split("\n").length - 1;
      if (change.removed) {
        continue;
      } else if (change.added) {
        Array.from({ length: lineCount }, (_, i) => i + 1).forEach(
          (l) => modified.add(l + offset),
        );
      }

      offset += lineCount;
    }
    modifiedLineNos.value = modified;
  }
  watch(code, () => {
    calculateLineDiffs();
  });

  function reset() {
    code.value = helloWorldCode;
    isCodeDirty.value = false;
    lineDiffs.value = [];
  }

  return {
    source,
    code,
    isCodeDirty,
    markClean,

    modifiedLineNos,
    calculateLineDiffs,

    reset,
  };
}
