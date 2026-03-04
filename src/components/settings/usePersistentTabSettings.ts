import { useStorage } from "@vueuse/core";
import { watch } from "vue";

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

export function usePersistentTabSettings(url: string) {
  const tabId = extractTabId(url);

  const localStorageId = `${tabId}-tab-settings`;

  const code = useStorage(`${localStorageId}--code`, helloWorldCode);

  const isCodeDirty = useStorage(`${localStorageId}--dirty`, false);
  function markClean() {
    isCodeDirty.value = false;
  }
  watch(code, () => {
    if (isCodeDirty.value === false) isCodeDirty.value = true;
  });

  function reset() {
    code.value = helloWorldCode;
    isCodeDirty.value = false;
  }

  return {
    code,

    isCodeDirty,
    markClean,

    reset,
  };
}
