
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
    ("S", "A", 4),
    ("A", "B", 4),
    ("B", "C", 3),
    ("C", "T", 4),

    ("S", "D", 5),
    ("D", "E", 6),
    ("E", "T", 5),

    ("S", "F", 2),
    ("F", "G", 6),
    ("G", "H", 2),
    ("H", "T", 8),
]


G = engine.DiGraph()
G.add_weighted_edges_from(graph1)





#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################

def setup(k):
    for v in G.nodes:
        G.nodes[v]["pred"] = [None]*(k+1)
        G.nodes[v]["path"] = None
        G.nodes[v]["pass"] = None
        G.nodes[v]["dist"] = [float("inf")]*(k+1)

def label_nodes(u, G):
    return u

def label_edges(u, v, G):
    return G.edges[u, v]["weight"]

def color_nodes(u, G):
    nonlocal k
    if G.nodes[u]["path"] is not None or G.nodes[u]["pass"] is not None:
        return "Gold"
    elif G.nodes[u]["pred"] != [None]*(k+1):
        return "LightSlateGray"
    return None

def color_edges(u, v, G):
    preds = [ w[0]  for w in G.nodes[v]["pred"] if w != None]
    if G.nodes[v]["pass"] == u:
        return "Green"
    elif G.nodes[v]["path"] == u:
        return "Gold"
    elif u in preds:
        return "LightSlateGray"
    return None






#####################################################
############ \/ \/ \/ Exercise \/ \/ \/ #############
#####################################################

# You are trapped in bureaucratic limbo and escaping will require 
# waiting in several queues to accomplish certain tasks: getting 
# paperwork, having it approved, submitting it to the correct 
# department, et cetera. 

#Mercifully, each task requires completing at most one predecessor 
# task but, being limbo, the sequence of tasks is not clear; there 
# may be several sequences which result in escape. Since limbo is 
# so crowded and confusing, the queue to task a from task b may be 
# different than from task c. As a small form of relief, you are 
# given some fast-passes which will let you skip k queues of your 
# choice.

# You have the clever idea to model your escape as a directed graph 
# G = (V,E) with edge lengths L(u,v)$ representing the queuing time 
# between tasks u and v. Develop a solution to minimize your expected 
# waiting time. Analyze its correctness and complexity.

### !!!!  Important !!!!
# In the Dijkstra and Bellman-Ford implementations below, the distance 
# ("dist") and predecessor ("pred") parameters of each node are _lists_
# of length k. Hence the index [p] trailing G.nodes[w]["dist"][p]. 

# It is important that you stick to this structure for the backtrack
# subroutine to correctly find your s-t path with passes. 

# What is this usefull for? Why might a node have more than one 
# predecessor or distance?




#####################################################
############ / / / Main Processes / / / #############
#####################################################

from queue import PriorityQueue

def Dijkstra(source, k):
    Q = PriorityQueue()
    Q.put((0, (source, 0)))
    G.nodes[source]["dist"][0] = 0  # Distance
    G.nodes[source]["pred"][0] = (source, 0)
    while not Q.empty():
        _, (v, p) = Q.get()
        for w in G.adj[v]: 
            if G.nodes[w]["dist"][p] > G.nodes[v]["dist"][p] + G.edges[v, w]["weight"]:
                G.nodes[w]["dist"][p] = G.nodes[v]["dist"][p] + G.edges[v, w]["weight"]
                Q.put((G.nodes[w]["dist"][p], (w, p)))
                G.nodes[w]["pred"][p] = (v, p)



def BellmanFord(source, k):
    G.nodes[source]["dist"][0] = 0  # Distance
    G.nodes[source]["pred"][0] = (source, 0)
    for i in range(len(G.nodes)-1):
        for v, w in G.edges:
            for p in range(k):
                if G.nodes[w]["dist"][p] > G.nodes[v]["dist"][p] + G.edges[v, w]["weight"]:
                    G.nodes[w]["dist"][p] = G.nodes[v]["dist"][p] + G.edges[v, w]["weight"]
                    G.nodes[w]["pred"][p] = (v, p)



def backtrack(v, p):
    # Utility function to
    # assemble the path from v to the source
    nonlocal path
    path.append(v)
    u, q = G.nodes[v]["pred"][p]
    if u != v:
        if p == q:
            G.nodes[v]["path"] = u
            backtrack(u, q)
        else:
            G.nodes[v]["pass"] = u
            backtrack(u, q)
    else:
        G.nodes[v]["path"] = "source"




#####################################################
################# / / / Run / / / ###################
#####################################################

source = "S"
sink = "T"
k = 2 #number of free-passes


setup(k)
G.label_nodes_by(label_nodes)
G.label_edges_by(label_edges)
G.color_nodes_by(color_nodes)
G.color_edges_by(color_edges)



Dijkstra(source, k)
#BellmanFord(source, k)


j = 0
d = float('inf')
for i in range(k+1):
    if G.nodes[sink]["dist"][i] < d:
        d = G.nodes[sink]["dist"][i]
        j = i

path = list()
backtrack(sink, j)`;
</script>

