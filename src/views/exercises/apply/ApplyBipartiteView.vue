
<template>

  <div class="h-full flex flex-col">

    <AlgorithmControlPanel class="h-15 h-1/5" />

    <div class="h-4/5 grow-1">

      <AlgorithmVisualizationPage :code="code" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "@/views/pages/AlgorithmVisualizationPage.vue";

  const code = `# Do not modify this part
G = engine.DiGraph()

G.add_edges_from([
    (1, 2),
    (2, 3),
    (3, 1),
    (3, 4),
    (1, 6),
    (2, 7),
    (3, 5),
    (3, 8)
])

for v in G.nodes:
    G.nodes[v]["reached"] = False
    G.nodes[v]["partition"] = None
    G.nodes[v]["pred"] = None
for e in G.edges:
    G.edges[e]["cycle_id"] = None


def color_edges(u, v, G):
    if G.nodes[v]["pred"] == u or G.nodes[u]["pred"] == v:
        return 1
    else:
        return None

def color_node(u, G):
  if G.nodes[u]["partition"] == "A":
    return "Red"
  elif G.nodes[u]["partition"] == "B":
    return "Blue"
  if G.nodes[u]["reached"]:
    return "DeepSkyBlue"
  else:
    return None

id = 2



G.color_nodes_by(color_node)
G.color_edges_by(color_edges)

# Modify code after this
#
# Your goal is to identify whether this is a bipartite graph
      
def dfs(v):
    if G.nodes[v]["reached"]:
        return
    G.nodes[v]["reached"] = True # Visualize if we reached v
    for neighbor in G.adj[v]:
        G.nodes[neighbor]["pred"] = v # Visualize if we reached neighbour
        dfs(neighbor)

# You may use the partition coloring logic like this
# A will color it red. B will color it dark blue
G.nodes[3]["partition"] = "A"

dfs(1)`;
</script>

