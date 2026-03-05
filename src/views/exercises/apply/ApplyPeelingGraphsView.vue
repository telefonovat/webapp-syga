
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

  const code = `edges1 = [
    (1, 2),
    (2, 3),
    (3, 1),
    (3, 4),
    (1, 6),
    (2, 7),
    (3, 5),
    (3, 8),
]

G = engine.Graph(edges1)

### DFS/BFS CONSTANTS ###
STATE_DEFAULT = 0  # Undiscovered
STATE_OPENED = 1
STATE_CLOSED = 2

###  IMPORTS          ###
from queue import Queue
import networkx as nx


## Visualization setup ##
def setup():
    for u in G.nodes:
        G.nodes[u][
            "state"
        ] = STATE_DEFAULT
        G.nodes[u][
            "pred"
        ] = None  # Predecessor in search

        G.nodes[u]["pre"] = None
        G.nodes[u]["post"] = None
    G.graph["should_label"] = False


def color_edge(u, v, G):
    if (
        G.nodes[u]["pred"] == v
        or G.nodes[v]["pred"] == u
    ):
        return "DeepSkyBlue"
    return None


def color_node(u, G):
    if (
        G.nodes[u]["state"]
        != STATE_DEFAULT
    ):
        return "DeepSkyBlue"
    return None


def label_node(u, G):
    if G.graph["should_label"]:
        return (
            u,
            G.nodes[u]["pre"],
            G.nodes[u]["post"],
        )
    return None


setup()
G.color_edges_by(color_edge)
G.color_nodes_by(color_node)
G.label_nodes_by(label_node)

#########################################
#########################################
###########UTILITY FUNCTIONS#############
#########################################
## These functions contain things you  ##
## already should know. You may modify ##
## them, use them as they are or write ##
## your own version                    ##

t = 0


# DFS with pre, post orderings
def graph_is_connected():
    return nx.is_connected(G)


def dfs_step(u):
    nonlocal t
    G.nodes[u]["state"] = STATE_OPENED
    G.nodes[u]["pre"] = t
    t += 1
    for v in G.adj[u]:
        if (
            G.nodes[v]["state"]
            == STATE_DEFAULT
        ):
            G.nodes[v]["pred"] = u
            dfs_step(v)

    G.nodes[u]["state"] = STATE_CLOSED
    G.nodes[u]["post"] = t


def bfs(start):
    nonlocal t
    q = Queue()
    q.put(start)
    while not q.empty():
        u = q.get()
        G.nodes[u][
            "state"
        ] = STATE_OPENED
        G.nodes[u]["pre"] = t
        t += 1
        for v in G.adj[u]:
            if (
                G.nodes[v]["state"]
                == STATE_DEFAULT
            ):
                q.put(v)
                G.nodes[v]["pred"] = u
        G.nodes[u][
            "state"
        ] = STATE_CLOSED
        G.nodes[u]["post"] = t


flag = True


def remove(u):
    G.remove_node(u)
    if len(G.nodes) == 0:
        print(f"G is empty")
        flag = False
    else:
        print(
            f"G is still connected after removing {u}: {graph_is_connected()}"
        )


###### ASSIGNMENT ######################
## Find a way to peel the graph    #####
## Hint: Can you modify DFS/BFS?   #####
########################################

#########################################
#########################################
######Your solution skeleton#############
#########################################

## You may test the utilities functions ##
## like below.                          ##
# dfs_step(1)
# bfs(1)

## To see pre, post values visualized, ##
## do this                             ##
# G.graph['should_label'] = True
# dfs_step(1)

order = list()


# Modify this or do something similar
def peel(u):
    for v in G.nodes:
        order.append(v)


peel(8)
for u in order:
    remove(u)

if flag:
    print("Graph was peeled correctly!")
else:
    print(
        "Graph was disconnected at some point"
    )`;
</script>

