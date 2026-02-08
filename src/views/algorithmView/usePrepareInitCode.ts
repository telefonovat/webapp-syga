import { buildCode } from "@/components/editor/buildCode";
import { useEditorStore } from "@/store/editor/editorStore";

const code = `
text = 'hello, stranger!'\n

G = engine.DiGraph([(i + 1, i + 2) for i in range(len(text) - 1)])\n

G.color_edges_by(lambda u, v, G: v if 'label' in G.nodes[v] else None)\n
G.color_nodes_by(lambda v, G: v if 'label' in G.nodes[v] else None)\n
G.label_nodes_by(lambda v, G: G.nodes[v]['label'] if 'label' in G.nodes[v] else ' ')\n

for i, symbol in enumerate(text):\n
  G.nodes[(i + 1)]['label'] = symbol\n

print(text)\n
`;

export async function usePrepareInitCode() {
  const editorStore = useEditorStore();
  editorStore.code = code;

  buildCode(editorStore.code);
}
