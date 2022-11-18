// A-STAR ALGORITHM

// push startNode onto openList
// while(openList is not empty) {
//  currentNode = find lowest f in openList
//  if currentNode is final, return the successful path
//  push currentNode onto closedList and remove from openList
//  foreach neighbor of currentNode {
//      if neighbor is not in openList {
//             save g, h, and f then save the current parent
//             add neighbor to openList
//      }
//      if neighbor is in openList but the current g is better than previous g {
//              save g and f, then save the current parent
//      }
//  }

// Takes a start, end and grid, and returns best path
export function aStar(start, end, nodes, SPEED) {
    // Create an open set to store the queue
    const openSet = []
    const closedSet = []
    // Add the startNode to the openSet
    openSet.push(start)
    console.log(openSet)

    // While the openSet is not empty...
    while (openSet.length > 0) {
        const current = getLowestFScore(openSet)
        // If the current node is the endNode --> stop
        if (current.isEnd) return
        // Push current onto closedList
        closedSet.push(current)
        // Remove current from openSet
        const currentIdx = openSet.indexOf(current)
        openSet.splice(currentIdx, 1)

    }


}

// sorts set by fScore and returns the first element 
function getLowestFScore(set) {
    sortByFScore(set)
}

// Sorts nodes in the set by fScore
function sortByFScore(set) {

}

// WORKING CORRECTLY
function linearNodes(grid) {
    // This takes 2D array input and returns single array of nodes
    let nodes = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push(grid[i][j])
        }
    }
    return nodes
}


export function aStarPath(end, SPEED) {
    
}