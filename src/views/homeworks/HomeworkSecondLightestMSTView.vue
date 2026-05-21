
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
    ("A", "B", 1),
    ("B", "C", 2),
    ("C", "D", 3),

    ("A", "D", 4),
    ("A", "C", 5),
    ("B", "D", 6),
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





G = engine.Graph()
G.add_weighted_edges_from(graph1)


def setup():
    engine.pause()
    for v in G.nodes:
        G.nodes[v]["root"] = v
    for e in G.edges:
        G.edges[e]["tree"] = False
        G.edges[e]["ignore"] = False
    engine.resume()

#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################

def label_nodes(u, G):
    return u

def label_edges(u, v, G):
    return G.edges[u, v]["weight"]

def color_edges(u, v, G):
    if G.edges[u, v]["ignore"]:
        return "IndianRed"
    if G.edges[u, v]["tree"]:
        return "Gold"
    return None


setup()
G.label_nodes_by(label_nodes)
G.label_edges_by(label_edges)
G.color_nodes_by(prop = "root")
G.color_edges_by(color_edges)



#####################################################
############ / / / Exercise / / / #############
#####################################################

# Recall this problem from the second test:

# Given a graph G and its unique minimum spanning tree T, suppose 
# that we want to find a second lightest spanning tree on G.

# The following process is implemented below via Kruskal's algorithm
  # Remove the lightest weight edge in T from G and 
  # Find a new MST on G.
# It fails on both example graphs given above.

# Implement a working solution (it may be slow) and argue about 
# its time complexity. 

# Propose a solution which would run faster and argue about its
# time complexity.




#####################################################
############ / / / Main Processes / / / #############
#####################################################

from queue import PriorityQueue

def QueueSetup():
    Q = PriorityQueue()
    for e in G.edges: 
        Q.put((G.edges[e]["weight"], e))
    return Q

def ShrubSetup():
    engine.pause()
    for v in G.nodes:
        G.nodes[v]["pred"] = None
        G.nodes[v]["root"] = v
        G.nodes[v]["depth"] = 0
    engine.resume()

def ShrubRoot(u):
    if G.nodes[u]["pred"] == None: return u
    else: return ShrubRoot(G.nodes[u]["pred"])

def ShrubFind(u,v):
    if ShrubRoot(u) == ShrubRoot(v): return True
    else: return False

def ShrubUnion(u, v, paused=True):
    a = ShrubRoot(u)
    b = ShrubRoot(v)
    if G.nodes[a]["depth"] < G.nodes[b]["depth"]:
        G.nodes[a]["pred"] = b
    elif G.nodes[a]["depth"] > G.nodes[b]["depth"]:
        G.nodes[b]["pred"] = a
    else:
        G.nodes[a]["depth"] = G.nodes[a]["depth"] + 1
        G.nodes[b]["pred"] = a
    #### Extra coloring logic for union-find ####
    if paused: engine.pause()    ## Not critical to Kruskal's algorithm
    G.edges[u, v]["tree"] = True
    for w in G.nodes: G.nodes[w]["root"] = ShrubRoot(w)
    if paused: engine.resume()


def Kruskal():  ## Kruskal's Algorithm 
    weight = 0
    ShrubSetup()
    tree = list()
    Q = QueueSetup()
    while not Q.empty():
        w, (u, v) = Q.get()
        if not ShrubFind(u, v):
            tree.append((u,v))
            ShrubUnion(u, v)
            weight += w
    return tree, weight


def KruskalIgnore(ignore, paused=False):  ## Kruskal's Algorithm that ignores a given list of edges
    weight = 0
    ShrubSetup()
    tree = list()
    Q = QueueSetup()
    for e in ignore:         ## Color ignored edges
        G.edges[e]["ignore"] = True
    if paused: engine.pause()  ## Pause the visualizer if desired 
    while not Q.empty():
        w, (u, v) = Q.get()
        if (u,v) in ignore:  ## Ignores the ignored edges
            continue
        elif not ShrubFind(u, v):
            tree.append((u,v))
            ShrubUnion(u, v, not paused)
            weight += w
    if paused: engine.resume() ## Un-pause the visualizer
    return tree, weight



#####################################################
################# / / / Run / / / ###################
#####################################################


T0, w0 = Kruskal()
print(f'MST: {T0}')
print(f'Weight: {w0}')

minEdge = None
minWeight = float("inf")
for e in T0:
    if G.edges[e]["weight"] < minWeight:
        minWeight = G.edges[e]["weight"]
        minEdge = e
      
if minEdge != None:
    setup()
    T1, w1 = KruskalIgnore([minEdge], True)
    print(f'SLST: {T1}')
    print(f'Weight: {w1}')`;
</script>

