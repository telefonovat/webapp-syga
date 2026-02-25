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
# G.color_nodes_by(lambda u, G: "Gold" if G.nodes[u]["state"] != STATE_DEFAULT else None) # Uncomment this to trace DFS
G.color_edges_by(prop="type", colors=["DeepSkyBlue", "Lime", "Crimson", "White"])

# Helpers
def is_back_edge(u, v):
    return (
        G.nodes[v]["pre"] < G.nodes[u]["pre"]
        and G.nodes[u]["post"] < G.nodes[v]["post"]
    )
def is_tree_edge(u, v):
    return (
        G.nodes[u]["pre"] < G.nodes[v]["pre"]
        and G.nodes[v]["post"] < G.nodes[u]["post"]
    )

def is_forward_edge(u, v):
    return (
        G.nodes[u]["pre"] < G.nodes[v]["pre"] and
        G.nodes[v]["post"] < G.nodes[u]["post"] 
    )
def determine_edge_type(u,v):
  if is_back_edge(u, v):
        G.edges[u, v]["type"] = "back_edge"
  elif is_tree_edge(u, v):
      G.edges[u, v]["type"] = "tree_edge"
  elif is_forward_edge(u, v):
      G.edges[u, v]["type"] = "forward_edge"
  else:
      G.edges[u, v]["type"] = "cross_edge"
# Algorithm

def dfs_step(u):
    G.nodes[u]["state"] = STATE_OPENED
    G.nodes[u]["pre"] = G.graph["time"]
    G.graph["time"] += 1

    # Explore in alphabetical order
    for v in sorted(G.adj[u]):
        if G.nodes[v]["state"] == STATE_DEFAULT:
            G.nodes[v]["pred"] = u
            dfs_step(v)
        elif G.nodes[u]["pred"] != v:
            G.edges[u, v]["back"] = True

    G.nodes[u]["state"] = STATE_CLOSED
    G.nodes[u]["post"] = G.graph["time"]
    G.graph["time"] += 1


# Run DFS over all components
G.graph["time"] = 0
for u in G.nodes:
    if G.nodes[u]["state"] == STATE_DEFAULT:
        dfs_step(u)


for u, v in G.edges:
  determine_edge_type(u,v)`;

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
    { title: "Forward edge", color: "Black" },
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
