<template>

  <AlgorithmControlPanel class="h-15 border-bottom" />

  <div class="h-full">

    <AlgorithmVisualizationPage :code="code" />

  </div>

</template>

<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "@/views/pages/AlgorithmVisualizationPage.vue";

  const code = `# Do not modify this part
G = engine.DiGraph()

G.add_edges_from([(1, 2), (2, 3), (3, 1), (3, 4)])

for v in G.nodes:
    G.nodes[v]["reached"] = False
    G.nodes[v]["pred"] = None
for e in G.edges:
    G.edges[e]["cycle_id"] = None


def color_edges(u, v, G):
    if G.edges[u, v]["cycle_id"] != None:
        return G.edges[u, v]["cycle_id"]
    elif G.nodes[v]["pred"] == u or G.nodes[u]["pred"] == v:
        return 1
    else:
        return None


id = 2


def add_cycle(edges):
    nonlocal id
    for e in edges:
        G.edges[e]["cycle_id"] = id
    id += 1

G.color_nodes_by(prop="reached", color="DeepSkyBlue")
G.color_edges_by(color_edges)

# Modify code after this
#
# Your goal is to find cycles and call add_cycle(edges)
#
# 1. You may use G.nodes[v]["reached"] and G.nodes[neighbor]["pred"]
# 2. When you find a cycle, call add_cycle(edges).
# 3. You may construct edges like this: (u, v). Note that the graph is directed


def dfs(v):
    if G.nodes[v]["reached"]:
        return
    G.nodes[v]["reached"] = True
    for neighbor in G.adj[v]:
        G.nodes[neighbor]["pred"] = v
        dfs(neighbor)


dfs(1)`;
</script>

