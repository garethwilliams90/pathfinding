// Begin with a set of unvisited nodes...

// Assign every node a distance of infinity --> start node is 0

// Set starting node as current node

// STEP 3.....................
// For current node --> consider it's UNVISITED neighbours...
// Calculate unvisited neighbours tentative distance to the current node

// Compare the newly calculated tentative distance against old one
// Assign the smaller of the 2 distances to the neighbour

// Once finished considering all of the unvisited neighbours of the current node...
// Mark the current node as visited & REMOVE it from unvisited set.

// If the destination node has been marked OR if the smallest distance...
// in the unvisited set is Infinity --> STOP, algorithm is done.

// Else, select the unvisited node with the smallest distance and...
// set it as the new current node
// Go back to STEP 3

const COLS = 12
const ROWS = 8

export function dijk(startNode, endNode, grid) {
    // Get all nodes in one array
    let allNodes = linearNodeArray(grid)
    console.log(allNodes)

    // Create set of unvisited nodes
    var unvisitedNodes = [...allNodes]
    // Set the start distance to 0 --> all nodes default distance is Infinity
    startNode.distance = 0
    startNode.isCurrent = true
    let currentNode = startNode
    console.log(currentNode)

    // For current node --> create arr of unvisited neighbours
    getUnvisitedNeighbours(currentNode, allNodes)

}

function linearNodeArray(grid) {
    let nodes = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push(grid[i][j])
        }
    }
    return nodes
}

function getUnvisitedNeighbours(current, allNodes) {
    const neighbours = [{}]
    const currentIndex = getCurrentIndex(current)
   
    //4 adjacent neighbours in each direction
    //Above: -COLS
    const above = allNodes[currentIndex-1]
    if (!above.isWall && !above.isVisited) {
        neighbours.push(above)
    }
    // Below: +COLS
    const below = allNodes[currentIndex+1]
    if (!below.isWall && !below.isVisited) {
        neighbours.push(below)
    }
    // Left: -1
    const left = allNodes[currentIndex-8]
    if (!left.isWall && !below.isVisited) {
        neighbours.push(left)
    }
    // Right: +1
    const right = allNodes[currentIndex+8]
    if (!right.isWall && !right.isVisited) {
        neighbours.push(right)
    }
    
    return neighbours
}

function getCurrentIndex(current) {
    const rowNum = current.row
    const colNum = current.col
    const arrayIndex = ((colNum - 1) * ROWS) + (rowNum - 1)
    return arrayIndex
}
