import { buildCodeNew } from "@/components/editor/buildCode";
import { ref } from "vue";

const code = `connections = [
    ("A", "B"),
    ("C", "B"),
    ("D", "C"),
    ("D", "E"),
    ("F", "E"),
    ("G", "F"),
    ("H", "G"),
    ("A", "H"),
    ("G", "A"),
    ("G", "B"),
    ("B", "F"),
    ("F", "C"),
    ("F", "D"),
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
G.color_edges_by(prop="type", colors=["#22ba3b", "#2abfb8"])


# Algorithm
def dfs_step(u):
    G.nodes[u]["state"] = STATE_OPENED
    G.nodes[u]["pre"] = G.graph["time"]
    G.graph["time"] += 1

    for v in G.adj[u]:
        if G.nodes[v]["state"] == STATE_DEFAULT:
            G.nodes[v]["pred"] = u
            dfs_step(v)
        elif G.nodes[u]["pred"] != v:
            G.edges[u, v]["back"] = True

    G.nodes[u]["state"] = STATE_CLOSED
    G.nodes[u]["post"] = G.graph["time"]
    G.graph["time"] += 1


G.graph["time"] = 0
for u in G.nodes:
    if G.nodes[u]["state"] == STATE_DEFAULT:
        dfs_step(u)


def is_back_edge(u, v):
    return (
        G.nodes[v]["pre"] < G.nodes[u]["pre"]
        and G.nodes[u]["post"] < G.nodes[v]["post"]
    )


for u, v in G.edges:
    if is_back_edge(u, v):
        G.edges[u, v]["type"] = "non_tree_edges"
    else:
        G.edges[u, v]["type"] = "tree_edge"`;

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
    { title: "Non-tree edges", color: "#22ba3b" },
    { title: "Tree edge", color: "#2abfb8" },
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
