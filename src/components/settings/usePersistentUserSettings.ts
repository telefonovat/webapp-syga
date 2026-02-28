import { useStorage } from "@vueuse/core";

const helloWorldCode = `text = 'hello, stranger!'
G = engine.DiGraph([(i + 1, i + 2) for i in range(len(text) - 1)])\n
G.color_edges_by(lambda u, v, G: v if 'label' in G.nodes[v] else None)
G.color_nodes_by(lambda v, G: v if 'label' in G.nodes[v] else None)
G.label_nodes_by(lambda v, G: G.nodes[v]['label'] if 'label' in G.nodes[v] else ' ')\n
for i, symbol in enumerate(text):
  G.nodes[(i + 1)]['label'] = symbol
print(text)`;

const code = useStorage("editor-code", helloWorldCode);

export function usePersistentUserSettings() {
  function reset() {
    code.value = helloWorldCode;
  }
  return {
    code,
    reset,
  };
}
