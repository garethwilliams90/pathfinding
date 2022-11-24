# pathfinding
### A React application that visualises various popular pathfinding algorithms.
# https://garethwilliams90.github.io/pathfinding/
## All the code in this repository is my own. 

![ezgif com-gif-maker](https://user-images.githubusercontent.com/61457033/202927320-57108c8a-ba6f-4f8b-86f7-02f9141673fe.gif)

# The Algorithms: 

## Dijkstra: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
Dijkstra's algorithm is a weighted, uninformed searched algorithm.
Dijkstras algorithm searches evenly in all directions and will **always find the optimal solution** for both distance and time (if the path is weighted). This is quite similar to the algorithm mapping softwares use find the shortest journey between two destinations, taking traffic and speed limit into account etc.

## Modified Dijkstra: 
This is a weighted, informed search algorithm.
I implemented this algorithm myself and is heavily based off Dijkstra's algorithm. The difference being that the current node being searched takes it's neighbours into account based on how close the neighbours are to the end node. When used in the open grid, the algorithm finds the optimal path faster, and with less search time than regular Dijkstra. However, when multiple paths are included and with walls added - this algorithm **does not guarantee the shortest path.**

## A* Search (Manhattan): https://en.wikipedia.org/wiki/A*_search_algorithm
This is a weighted informed search algorithm.

A* uses the position of the end node to inform the search if it is going in roughly the correct direction. **A* always guarantees the optimal path** and is typically extremely fast and uses less search time than Dijkstra's.

*The Manhattan heuristic*, calculates the distance from the current node, to the end node by adding vertical and horiztonal distance simply. https://en.wikipedia.org/wiki/Taxicab_geometry

*The Euclidean heuristic* find the distance based on Euclidean distance (diagonal distance). Typically end up in a path that emulates as the crow might fly rather than along roads. In the case where diagonal paths are allowed, this would end up in an even better solution than a typical optimal solution. https://en.wikipedia.org/wiki/Taxicab_geometry, https://en.wikipedia.org/wiki/Euclidean_geometry

## Depth First Search: https://en.wikipedia.org/wiki/Depth-first_search
This is an unweighted, uninformed search algorithm.
Depth first search explores all sub- branches of one branch then progresses to the next branch. It is illustrated best when used with the Maze feature as you will see it search all the possible routes of the maze before stopping at the end node.
**It does not guarantee the optimal path** unless it is in a one way maze. Sometimes depth first search will produce an extremely fast, correct solution, but this is luck based. 

