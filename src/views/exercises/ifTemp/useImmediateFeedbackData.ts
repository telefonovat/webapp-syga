import { buildCodeNew } from "@/components/editor/buildCode";
import { ref } from "vue";

const code = `connections = [
    ("A", "B"),
    ("C", "B"),
    ("D", "C"),
    ("D", "E"),
    ("B", "F"),
    ("F", "C"),
    ("F", "D"),
    ("F", "E"),
    ("G", "A"),
    ("G", "B"),
    ("G", "F"),
    ("A", "H"),
    ("H", "G"),
]


G = engine.DiGraph(connections)


# Preparation
STATE_DEFAULT = 0
STATE_OPENED = 1
STATE_CLOSED = 2

G.graph["time"] = None
for v in G.nodes:
    G.nodes[v]["state"] = STATE_DEFAULT
    G.nodes[v]["pred"] = None
    G.nodes[v]["pre"] = None
    G.nodes[v]["post"] = None

for u, v in G.edges:
    G.edges[u, v]["type"] = None

# Style
# G.color_nodes_by(lambda u, G: "Gold" if G.nodes[u]["state"] != STATE_DEFAULT else None) # Uncomment this to trace DFS
G.color_edges_by(prop="type", colors=["DeepSkyBlue", "Lime", "Gold", "Crimson"])


# Algorithm

def dfs_step(u):
    G.nodes[u]["state"] = STATE_OPENED
    G.nodes[u]["pre"] = G.graph["time"]
    G.graph["time"] += 1

    # Explore in alphabetical order
    for v in G.adj[u]:
        if G.nodes[v]["state"] == STATE_DEFAULT:
            G.nodes[v]["pred"] = u
            G.edges[u, v]["type"] = "tree_edge"
            dfs_step(v)
        else:
            if G.nodes[v]["post"] == None:
                G.edges[u, v]["type"] = "back_edge"
            elif G.nodes[u]["pre"] < G.nodes[v]["pre"]:
                G.edges[u, v]["type"] = "forward_edge"
            else:
                G.edges[u, v]["type"] = "cross_edge"

    G.nodes[u]["state"] = STATE_CLOSED
    G.nodes[u]["post"] = G.graph["time"]
    G.graph["time"] += 1


# Run DFS over all components
root = "A"

G.graph["time"] = 0
dfs_step(root)`;

export type EdgeChoice = {
  title: string;
  color: string;
};

export type NodeChoice = {
  title: string;
  color: string;
};

export async function useImmediateFeedbackData() {
  const frames = await buildCodeNew(code);

  const edgeColorChoices: EdgeChoice[] = [
    { title: "Tree edge", color: "Crimson" },
    { title: "Back edge", color: "DeepSkyBlue" },
    { title: "Forward edge", color: "Gold" },
    { title: "Cross edge", color: "LimeGreen" },
    { title: "Reset", color: null },
  ];

  const solutionComponent = ref(
    frames[frames.length - 1].graphComponents[0],
  );
  const blankComponent = ref(frames[0].graphComponents[0]);
  return {
    code,
    frames,
    edgeColorChoices,
    solutionComponent,
    blankComponent,
  };
}
