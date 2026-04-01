
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

  const code = `#####################################################
############# / / / Graph Setup / / / ###############
#####################################################

graph1 = [
    ("S", "A", 1),
    ("A", "B", 1),
    ("B", "D", 1),
    ("D", "T", 1),
    
    ("E", "T", 1),
    ("C", "E", 2),
    ("S", "C", 1),
]

graph2 = [
    ("S", "A", 7),
    ("A", "T", 4),
  
    ("B", "T", 5),
    ("C", "B", 3),
    ("S", "C", 3),
  
    ("D", "T", 6),
    ("E", "D", 2),
    ("F", "E", 2),
    ("S", "F", 1),
]


G = engine.DiGraph()
G.add_weighted_edges_from(graph1)

def setup():
    for v in G.nodes:
        G.nodes[v]["state"] = None
        G.nodes[v]["pred"] = None
        G.nodes[v]["path"] = None
        G.nodes[v]["cost"] = float("inf")




#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################

def label_nodes(u, G):
    return (u,G.nodes[u]["cost"])

def label_edges(u, v, G):
    return G.edges[u, v]["weight"]

def color_nodes(u, G):
    if G.nodes[u]["path"] is not None:
        return "Gold"
    elif G.nodes[u]["pred"] is not None:
        return "LightSlateGray"
    return None

def color_edges(u, v, G):
    if G.nodes[v]["path"] == u:
        return "Gold"
    elif G.nodes[v]["pred"] == u:
        return "LightSlateGray"
    return None

setup()
G.label_nodes_by(label_nodes)
G.label_edges_by(label_edges)
G.color_nodes_by(color_nodes)
G.color_edges_by(color_edges)




#####################################################
############ / / / Exercise / / / #############
#####################################################

# Pavel wants to fly from Prague to Tokyo, it’s a priority 
# that Pavel spends as little money as possible on these 
# flights. Additionally, he would prefer to have as few 
# layovers as possible during his trip. You are given the 
# record of all flights from all airports in the world and 
# their prices (nonnegative integers). 

# Example: If there is a sequence of 4 flights Prague -> 
# Belgrade -> Beijing -> Tokyo which costs 1200 euros and 
# a sequence of 3 flights Prague -> New York ->Tokyo that 
# costs 1300 euros we will take the longer sequence, but 
# if both sequences cost equal amount of money we want to 
# choose the one with only 3 flights.

#Design an efficient algorithm that finds an optimal sequence 
# of flights for Pavel. Argue about the correctness and time 
# complexity of your algorithm.

# Dijkstra's and the Bellman-Ford algorithms are implemented
# below. Modify them to assign the 'pred' of each node to match 
# the correct path.


### Note:
# There are two example graphs given at the top of this code. 




#####################################################
############ / / / Main Processes / / / #############
#####################################################

from queue import PriorityQueue

def Dijkstra(source):
    Q = PriorityQueue()
    Q.put((0, source))
    G.nodes[source]["cost"] = 0 # Distance
    G.nodes[source]["pred"] = source
    while not Q.empty():
        _, v = Q.get()
        for w in G.adj[v]:
            if G.nodes[w]["cost"] > G.nodes[v]["cost"] + G.edges[v, w]["weight"]:
                G.nodes[w]["cost"] = G.nodes[v]["cost"] + G.edges[v, w]["weight"]
                Q.put((G.nodes[w]["cost"], w))
                G.nodes[w]["pred"] = v


def BellmanFord(source):
    G.nodes[source]["cost"] = 0 # Cost
    G.nodes[source]["pred"] = source
    for i in range(len(G.nodes)-1):
        for v, w in G.edges:
            if G.nodes[w]["cost"] > G.nodes[v]["cost"] + G.edges[v, w]["weight"]:
                G.nodes[w]["cost"] = G.nodes[v]["cost"] + G.edges[v, w]["weight"]
                G.nodes[w]["pred"] = v


# The 'Shortest Path Faster' algorithm is based on Bellman-Ford but uses a 
# vertex queue to avoid relaxing vertices which have not changed. The version 
# of Bellman-Ford described in 'Algorithm Labyrinth Guide' is actually SPF.
def SPF(source):  
    LastVert = source
    Phase = 1
    open_vertices = list()
    open_vertices.append(source)
    G.nodes[source]["cost"] = 0 # Cost
    G.nodes[source]["pred"] = source
    while len(open_vertices) > 0:
        v = open_vertices.pop(0)
        for w in G.adj[v]:
            if G.nodes[w]["cost"] > G.nodes[v]["cost"] + G.edges[v, w]["weight"]:
                G.nodes[w]["cost"] = G.nodes[v]["cost"] + G.edges[v, w]["weight"]
                open_vertices.append(w)
                G.nodes[w]["pred"] = v
        if len(open_vertices) == 0:
            break
        if Phase == len(G.nodes)-1:
            break
        if v == LastVert:
            LastVert = open_vertices[-1]
            Phase += 1


def backtrack(v):
    # Utility function to
    # assemble the path from v to the source
    nonlocal path
    path.append(v)
    u = G.nodes[v]["pred"]
    if u != v:
        G.nodes[v]["path"] = u
        backtrack(u)
    else:
        G.nodes[v]["path"] = "source"



#####################################################
################# / / / Run / / / ###################
#####################################################

source = "S"
sink = "T"

Dijkstra(source)
#BellmanFord(source)
#SPF(source)

if G.nodes[sink]["pred"] != None:
    path = list()
    backtrack(sink)
    path.reverse()
    print(f'Cheapest Path:  {path}')
    print(f'Cost:           {G.nodes[sink]["cost"]}')
    print(f'# of Layovers:  {len(path)-1}')`;
</script>

