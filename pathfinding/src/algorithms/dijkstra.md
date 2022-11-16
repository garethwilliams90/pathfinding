1. Mark ALL nodes as unvisited

2. Mark all unvisited nodes as distance = Infinity
   2.1 Mark start node as distance = 0
   2.2 Set the start node as the current node

3. For current node, consider unvisited neighbours
   Conditions to be added:
   must not be a wall,
   must be adjacent to current,
   must not be visited,
   must not be current

   3.1 Take neighbour set and calculate their distances from the start node
   Distance = previousNode.distance + 1

   3.2 If neighbour node current distance value is greater than one just calculated,
   re-assign the calculated distance

4. When done with step 3 for all neighbours in the neighbour set,
   4.1 mark current node as visited
   4.2 remove current node from unvisited set - this should never be checked again

5. If endNode has been reached:
   endNode has smallest distance in unvisited set --> then stop

   5.1 Or if the smallest unvisited distance if Infinity --> stop

6. If step 5. is false, select the smallest distance unvisited node,
   and set as current

# PSEUDO CODE WITH PRIORITY QUEUE

1 function Dijkstra(Graph, source):
2 dist[source] ← 0 // Initialization
3
4 create vertex priority queue Q
5
6 for each vertex v in Graph.Vertices:
7 if v ≠ source
8 dist[v] ← INFINITY // Unknown distance from source to v
9 prev[v] ← UNDEFINED // Predecessor of v
10
11 Q.add_with_priority(v, dist[v])
12
13
14 while Q is not empty: // The main loop
15 u ← Q.extract_min() // Remove and return best vertex
16 for each neighbor v of u: // Go through all v neighbors of u
17 alt ← dist[u] + Graph.Edges(u, v)
18 if alt < dist[v]:
19 dist[v] ← alt
20 prev[v] ← u
21 Q.decrease_priority(v, alt)
22
23 return dist, prev
