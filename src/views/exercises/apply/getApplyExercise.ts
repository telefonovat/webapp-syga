import { triggerNonFatalError } from "@/components/error/useErrorHandler";

interface ApplyExercise {
  code: string;
}

const exercises: Record<string, ApplyExercise> = {
  "week-6/three-smooth": {
    code: `#####################################################
############# / / / Graph Setup / / / ###############
#####################################################

graph1 = [
    ("S", "A", 1),
    ("A", "T", 5),
    ("S", "B", 2),
    ("B", "C", 4),
    ("C", "T", 6),
    ("A", "C", 7),
]

graph2 = [
    ("S", "A", 1),
    ("A", "B", 5),
    ("B", "T", 10),
    ("S", "C", 2),
    ("C", "D", 7),
    ("D", "T", 12),
]

graph3 = [
    ("S", "A", 5),
    ("A", "T", 7),
    ("S", "B", 1),
    ("B", "C", 2),
    ("C", "D", 3),
    ("D", "T", 4),
]


G = engine.DiGraph()
G.add_weighted_edges_from(graph1)

def setup():
    for v in G.nodes:
        G.nodes[v]["state"] = None
        G.nodes[v]["pred"] = None
        G.nodes[v]["path"] = None
        G.nodes[v]["dist"] = float("inf")




#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################

def label_nodes(u, G):
    return u

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
############ \/ \/ \/ Exercise \/ \/ \/ #############
#####################################################

# Given an undirected graph G with integer weights on edges, 
# we say that a walk in G is 'k-smooth' if the weights of
# each pair of consecutive edges differ by at most k. 

# Develop an algorithm that finds a 3-smooth walk from a
# node \(s\) to a node \(t\) with the least number of edges.

# A general relaxation algorithm is given below. Modify it to
# assign the 'pred' of each node to match the correct path.


### Note:
# There are three example graphs given at the top of this code. 
# The second does NOT have a k-smooth s-t path. 




#####################################################
############ / / / Main Processes / / / #############
#####################################################

def relax(source):
    open_vertices = list()
    open_vertices.append(source)
    G.nodes[source]["dist"] = 0 # Distance
    G.nodes[source]["pred"] = source
    while len(open_vertices) > 0:
        v = open_vertices.pop(0)
        for w in G.adj[v]:
            if G.nodes[w]["dist"] > G.nodes[v]["dist"] + G.edges[v, w]["weight"]:
                G.nodes[w]["dist"] = G.nodes[v]["dist"] + G.edges[v, w]["weight"]
                open_vertices.append(w)
                G.nodes[w]["pred"] = v


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


relax(source)

if G.nodes[sink]["pred"] != None:
    path = list()
    backtrack(sink)
    path.reverse()
    print(f'shortest 3-smooth path: {path}')
else: 
    print('no 3-smooth path found')
`,
  },
  "week-6/fatigueing-path": {
    code: `#####################################################
############# / / / Graph Setup / / / ###############
#####################################################

graph1 = [
    ("S", "A", 1),
    ("A", "B", 1),
    ("B", "T", 1),
    ("S", "C", 0),
    ("C", "D", 1),
    ("D", "T", 0),
]

graph2 = [
    ("S", "A", 0),
    ("A", "B", 1),
    ("B", "C", 0),
    ("C", "D", 1),
    ("D", "E", 0),
    ("E", "F", 1),
    ("F", "T", 0),
    ("G", "T", 1),
    ("S", "G", 1),
]

graph3 = [
    ("S", "A", 0),
    ("A", "C", 0),
    ("S", "B", 1),
    ("B", "C", 1),
    ("C", "D", 1),
    ("D", "T", 0),
    ("C", "T", 0),
]


G = engine.DiGraph()
G.add_weighted_edges_from(graph1)

def setup():
    for v in G.nodes:
        G.nodes[v]["state"] = None
        G.nodes[v]["pred"] = None
        G.nodes[v]["path"] = None
        G.nodes[v]["dist"] = float("inf")
    for u, v in G.edges:
        G.edges[u, v]["class"] = G.edges[u, v]["weight"]
        G.edges[u, v]["weight"] = None


#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################

def label_nodes(u, G):
    return u

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
G.shape_edges_by(prop="class")
G.color_nodes_by(color_nodes)
G.color_edges_by(color_edges)




#####################################################
############ \/ \/ \/ Exercise \/ \/ \/ #############
#####################################################

# Imagine an unweighted graph G has two classes of edge 
# (solid and dashed). Given a path P, we say that an edge 
# is fatigued if the edge immediately prior was of the 
# same class.

# Suppose that a fatigue edge weighs five while a fresh edge
# weighs only one. Develop an algorithm to find a shortest
# path on G.

# A general relaxation algorithm is given below. Modify it to
# assign the 'pred' of each node to match the correct path.


### Note:
# There are three example graphs given at the top of this code. 




#####################################################
############ / / / Main Processes / / / #############
#####################################################

def relax(source):
    opens = list()
    opens.append(source)
    G.nodes[source]["dist"] = 0
    G.nodes[source]["pred"] = source
    while len(opens) > 0:
        v = opens.pop(0)
        for w in G.adj[v]:
            if  G.nodes[w]["dist"] > G.nodes[v]["dist"] + 1:
                G.nodes[w]["dist"] = G.nodes[v]["dist"] + 1
                opens.append(w)
                G.nodes[w]["pred"] = v


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


relax(source)

if G.nodes[sink]["pred"] != None:
    path = list()
    backtrack(sink)
    path.reverse()
    print(f'shortest path: {path} has length {G.nodes[sink]["dist"]}')`,
  },

  "week-6/k-edge-shortest-path": {
    code: `#####################################################
############# / / / Graph Setup / / / ###############
#####################################################

graph1 = [
    ("S", "T", 11),
    ("A", "T", 5),
    ("S", "A", 5),
    ("B", "T", 3),
    ("C", "B", 3),
    ("S", "C", 3),
    ("D", "T", 2),
    ("E", "D", 2),
    ("F", "E", 2),
    ("S", "F", 2),
]

graph2 = [
    ("S", "A", -1),
    ("A", "B", -1),
    ("B", "C", -1),
    ("C", "T", -1),
    ("T", "A", -1),
]




G = engine.DiGraph()
G.add_weighted_edges_from(graph1)

def setup():
    for v in G.nodes:
        G.nodes[v]["state"] = None
        G.nodes[v]["pred"] = None
        G.nodes[v]["path"] = None
        G.nodes[v]["dist"] = float("inf")




#####################################################
########### / / / Visualizer Setup / / / ############
#####################################################

def label_nodes(u, G):
    return u

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
############ \/ \/ \/ Exercise \/ \/ \/ #############
#####################################################

# You need to travel from city s to city t for work and you would
# like to drive the shortest possible distance. Curiously, every 
# road between the two cities costs one token to enter you have
# only k tokens. How might you find the shortest feasible path?

# Given a weighted graph G = (V,E), develop an algorithm to find 
# shortest paths which uses at most $k$ edges from some source 
# node s in O(k |E|) time. Does your algorithm need to change if
# there are negative weights?

# A general relaxation algorithm is given below. Modify it to
# assign the 'pred' of each node to match the correct path.


### Note:
# There are two example graphs given at the top of this code. 
# The second has is a negative cycle. How does your solution 
# behave as k increases? 
# Can add an edge to the first graph to get a negative cycle?




#####################################################
############ / / / Main Processes / / / #############
#####################################################

def relax(source, k):
    last_vertex = source
    phase = 1
    open_vertices = list()
    open_vertices.append(source)
    G.nodes[source]["dist"] = 0 # Distance
    G.nodes[source]["pred"] = source
    while len(open_vertices) > 0:
        v = open_vertices.pop(0)
        for w in G.adj[v]:
            if G.nodes[w]["dist"] > G.nodes[v]["dist"] + G.edges[v, w]["weight"]:
                G.nodes[w]["dist"] = G.nodes[v]["dist"] + G.edges[v, w]["weight"]
                open_vertices.append(w)
                G.nodes[w]["pred"] = v
        
            


def backtrack(v):
    # Utility function to
    # assemble the path from v to the source
    nonlocal path
    nonlocal sink
    path.append(v)
    u = G.nodes[v]["pred"]
    if u == sink:
        G.nodes[v]["path"] = u
        path.append(u)
    elif u != v:
        G.nodes[v]["path"] = u
        backtrack(u)
    else:
        G.nodes[v]["path"] = "source"




#####################################################
################# / / / Run / / / ###################
#####################################################

source = "S"
sink = "T"
k = 3

relax(source, k)

if G.nodes[sink]["pred"] != None:
    path = list()
    backtrack(sink)
    path.reverse()
    if path[0] == path[-1]:
        print(f'G has a negative {source}-{sink} cycle {path}.')
        print(f'With only {k} edges, it has length {G.nodes[sink]["dist"]}')
    else:
        print(f'The shortest {k}-edge path {path} has length {G.nodes[sink]["dist"]}')`,
  },
};
export function getApplyExercise(url: string): ApplyExercise {
  if (!exercises[url])
    triggerNonFatalError({
      errorMessage: "Apply exercise not found",
    });

  return exercises[url];
}
