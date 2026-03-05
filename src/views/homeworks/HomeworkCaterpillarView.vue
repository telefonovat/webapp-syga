
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

  const code = `from queue import Queue

#####################################################
############# / / / Graph Setup / / / ###############
#####################################################

simple_caterpillar = [
    ("A", "B"),
    ("B", "C"),
    ("C", "D"),
    ("B", "E"),
    ("B", "F"),
    ("C", "G"),
]

caterpillar_without_all_nodes = [
    ("A", "B"),
    ("B", "C"),
    ("B", "D"),
    ("B", "E"),
    ("E", "F"),
    ("B", "G"),
    ("B", "H"),
    ("B", "I"),
    ("B", "J"),
]

large_caterpillar = [
    ("E", "B"),
    ("F", "B"),
    ("A", "B"),
    ("I", "D"),
    ("A", "D"),
    ("D", "J"),
    ("M", "J"),
    ("N", "J"),
    ("G", "C"),
    ("A", "C"),
    ("C", "H"),
    ("H", "L"),
]

G = engine.Graph(simple_caterpillar)


def setup():
    for v in G.nodes:
        G.nodes[v]["pred"] = None
        G.nodes[v]["is_caterpillar"] = False


#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################


def label_nodes(u, G):
    return u


def color_node(u, G):
    if G.nodes[u]["is_caterpillar"]:
        return "Gold"
    elif G.nodes[u]["pred"] != None:
        return "LightSlateGray"
    return None


def color_edge(u, v, G):
    if G.nodes[v]["pred"] == u:
        return "LightSlateGray"
    return None


setup()
G.label_nodes_by(label_nodes)
G.color_nodes_by(color_node)
G.color_edges_by(color_edge)


#####################################################
############### / / / Exercise / / / ################
#####################################################

# A caterpillar is a graph which consists of body (a path) with
# at most four legs (degree-one nodes) adjacent to each body node.
# The size of a caterpillar is its total number of nodes
# (including both body and leg nodes).

# Given a tree T  with n nodes, develop an algorithm to find the
# largest caterpillar subgraph in  T. The ideal solution will run
# in O(n) time.

# Use the search algorithms below, or create your own from scratch.


#####################################################
############ / / / Main Processes / / / #############
#####################################################


# Vanilla DFS. You may modify/copy-paste this code in your solution.
def dfs(v):
    for neighbor in G.adj[v]:
        if G.nodes[neighbor]["pred"] == None:
            G.nodes[neighbor]["pred"] = v  # coloring logic
            dfs(neighbor)


# Vanilla BFS. You may modify/copy-paste this code in your solution.
def bfs(s):
    visited = {s}
    q = Queue()
    q.put(s)
    while not q.empty():
        v = q.get()
        for w in G.adj[v]:
            if w not in visited:
                visited.add(w)
                G.nodes[w]["pred"] = v
                q.put(w)


# Returns the largest caterpillar starting at v
def caterpillar(v):
    return [v]


#####################################################
############ / / / Main Processes / / / #############
#####################################################

root = "A"

G.nodes[root]["pred"] = "root"

result = caterpillar(root)

if type(result) == list:
    for u in result:
        G.nodes[u]["is_caterpillar"] = True`;
</script>

