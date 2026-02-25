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
########## \/ \/ \/ Graph Setup \/ \/ \/ ############
#####################################################

edges1 = [
    ("A", "B"),
    ("A", "C"),
    ("B", "D"),
    ("B", "E"),
    ("C", "F"),
    ("C", "G"),
    ("E", "A"),
    ("F", "E"),
]

edges2 = [
    ("A", "B"),
    ("C", "B"),
    ("B", "F"),
    ("C", "F"),
    ("F", "G"),
    ("G", "B"),
    ("A", "H"),
    ("H", "D"),
    ("H", "E"),
]

edges3 = [
    ("A", "B"),
    ("A", "C"),
    ("B", "D"),
    ("B", "E"),
    ("C", "F"),
    ("C", "G"),
    ("E", "A"),
]

G = engine.DiGraph(edges1)



#####################################################
######## \/ \/ \/ Visualizer Setup \/ \/ \/ #########
#####################################################

# Initialize
G.graph["time"] = 0
for v in G.nodes:
    G.nodes[v]["in"]  = None
    G.nodes[v]["out"] = None
    G.nodes[v]["low"]  = float('inf')
    G.nodes[v]["root"]  = False
for u,v in G.edges:
    G.edges[u, v]["tree"]  = False
    G.edges[u, v]["back"] = False
    G.edges[u, v]["forward"] = False
    G.edges[u, v]["cross"] = False


# Label/Color by state
def label_nodes(u, G):
        return (u)

def color_nodes(u, G):
    if G.nodes[u]["out"] != None:
        return 1
    elif G.nodes[u]["in"] != None:
        return 2
    else:
        return None

def color_edges(u, v, G):
    if G.edges[u, v]["tree"]:
        return 1
    elif G.edges[u, v]["back"]:
        return 2
    elif G.edges[u, v]["cross"]:
        return 3
    elif G.edges[u, v]["forward"]:
        return 4
    else:
        return None

G.label_nodes_by(label_nodes)
G.color_nodes_by(color_nodes)
G.color_edges_by(color_edges)



#####################################################
############ \/ \/ \/ Exercise \/ \/ \/ #############
#####################################################
# A directed graph is called 'singly connected' if, for every pair of vertices u and v,
# there is at most one path from u to v. 

# Develop an algorithm to determine weather or not a directed graph is singly connected.

# Your algorithm should set 'flag = 1' whenever you find a counterexample.


### Note:
# There are three example graphs given at the top of this code. 
# The first two are NOT singly connected. 



#####################################################
######### \/ \/ \/ Main Processes \/ \/ \/ ##########
#####################################################

# Subroutines
def back_edgeTF(u, v):
    if G.nodes[v]["out"] == None:
        return True
    return False

def forward_edgeTF(u, v):
    if G.nodes[v]["out"] != None:
        if G.nodes[u]["in"] < G.nodes[v]["in"]:
            return True
    return False

def cross_edgeTF(u, v):
    if G.nodes[v]["out"] != None:
        if G.nodes[u]["in"] > G.nodes[v]["in"]:
            return True
    return False


# Algorithm
def dfs(v, flag):
    G.graph["time"] += 1
    G.nodes[v]["in"] = G.graph["time"]
    G.nodes[v]["low"] = float('inf')
    
    for w in G.neighbors(v): 
        if G.nodes[w]["in"] == None: # (v, w) is a tree edge
            G.edges[v, w]["tree"] = True
            flag = dfs(w, flag)
            if flag == 1:
                return flag

        if back_edgeTF(v, w):
            G.edges[v, w]["back"] = True

        elif forward_edgeTF(v, w):
            G.edges[v, w]["forward"] = True
            
        elif cross_edgeTF(v, w):
            G.edges[v, w]["cross"] = True

    G.graph["time"] += 1
    G.nodes[v]["out"] = G.graph["time"]
    return flag


# Run
root = "A"

flag = dfs(root, 0)
if flag > 0:
    print(f'Graph is NOT singly-connected from root = {root}.')
else:
    print(f'Graph is singly-connected from root = {root}.')`;
</script>

