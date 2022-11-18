0.  h is the heurisitic function
    0.1. h(n) estimates the cost of getting from n, to the goal

1.  Start with known start node as a priority queue

2.  Initialise an open set with just the startNode

3.  For node n, set previousNode to be null

4.  For node, gScore(n) is the cost of cheapest path from start to node n
    4.1. Set gScore to infinity
    4.2. Set gScore of startNode to 0

5.  For node n, fScore(n) = gScore(n) + h(n)
    fScore is the current best guess as to how cheap a path going through n could be
    5.1. All nodes have fScore infinity
    5.2. Set start fScore = h(start)

6.  While the open set is not empty:
    6.1. current = node in open set with the lowest fScore

    6.2 if the currentNode = endNode: return and get the RECONSTRUCTED PATH
    6.3 else: Remove the currentNode from the open set

    7.  For each neighbour of the current node:
        7.1. d(current, neighbour) is the weight of the edge from current to neigbour
        7.2. Tentative gScore is distance from start to neigbour, via current
        7.3. tentative_gScore = gScore(current) + d(current, neigbour)
        7.4. If tentative gScore < gScore(neighbour)
        Then the path to this neighbour is best so far
        7.5. cameFrom(neighbour) = current
        7.6. gScore(neighbour) = tentative_gScore
        7.7. fScore(neighbour) = tentative_gScore + h(neighbour)

            if the neighbour is not in the openset:
                open set.add(neighbour)

7.  If the open set is empty:
    return failure --> no path!
