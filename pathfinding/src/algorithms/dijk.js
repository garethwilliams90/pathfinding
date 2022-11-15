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

const ROWS = 8
const COLS = 12

export function dijk(startNode, endNode, grid) {
    let nodesInVisitedOrder = []
    // Get all nodes in one array
    const allNodes = linearNodeArray(grid)
    const unvisitedNodes = [...allNodes]
    console.log(allNodes)
    
    // Set the start distance to 0 --> all nodes default distance is Infinity
    startNode.distance = 0
    let currentNode = startNode
    
    let endReached = false
    let distanceSortedArray = sortNodesByDistance(allNodes)
    let minUnvisitedDistance = distanceSortedArray[0].distance
    console.log(minUnvisitedDistance)

    while (!endReached || minUnvisitedDistance !== Infinity) {

        step3(currentNode)
        function step3(currentNode) {
            console.log("CurrentNode: ",currentNode)
            currentNode.isCurrent = true
            // For the current node...
            let currentUnvisitedNeighbours = getUnvisitedNeighbours(currentNode, unvisitedNodes)
            currentUnvisitedNeighbours.map(node => node.isVisited = true)
            // get distances for these unvisited neighbours
            getTentativeDistances(currentUnvisitedNeighbours, currentNode)
            
            // Mark current node as visited
            currentNode.isVisited = true
            // Remove current node from unvisited set
            console.log("Current: ", currentNode)
            let currentIndex = unvisitedNodes.indexOf(currentNode) -1
            console.log("Unvisited ", unvisitedNodes)
            console.log("Current idx ", currentIndex)
            unvisitedNodes.splice(currentIndex, 1)
            console.log("Unvisited length ", unvisitedNodes.length)
            // Add current node to visited set
            let node = unvisitedNodes.splice(currentIndex, 1)[0]
            nodesInVisitedOrder.push(node)
            console.log("Visited Nodes ", nodesInVisitedOrder)
    
            // Unassign current node
            currentNode.isCurrent = false
    
            // Re-assign current by selecting node with smallest distance in unvisited set
            sortNodesByDistance(unvisitedNodes)
            let newCurrentNode = unvisitedNodes[0]
    
            step3(newCurrentNode)
        }
        endReached = checkEndReached()
    }
    console.log("End reached")
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
    let neighbours = []
    const currentIndex = getCurrentIndex(current)
    console.log(allNodes)
   
    //4 adjacent neighbours in each direction
    //Above: -1
    const above = allNodes[currentIndex-1]
    if (above && (!above.isWall && !above.isVisited)) {
        neighbours.push(above)
    }
    
    // Below: +1
    const below = allNodes[currentIndex+1]
    if (below && (!below.isWall && !below.isVisited)) {
        neighbours.push(below)
    }

    // Left: -ROWS
    const left = allNodes[currentIndex-ROWS]
    if (left && (!left.isWall && !left.isVisited)) {
        neighbours.push(left)
    }

    // Right: +ROWS
    const right = allNodes[currentIndex+ROWS]
    if (right && (!right.isWall && !right.isVisited)) {
        neighbours.push(right)
    }

    console.log(neighbours)
    return neighbours
}

function getCurrentIndex(current) {
    const rowNum = current.row
    const colNum = current.col
    const arrayIndex = ((colNum - 1) * ROWS) + (rowNum - 1)
    return arrayIndex
}

function getTentativeDistances(unvisitedNeigbours, currentNode) {
    const prevDistances = unvisitedNeigbours.map(node => node.distance)
    const newDistances = unvisitedNeigbours.map(node => (
        Math.abs(currentNode.col - node.col) + Math.abs(currentNode.row - node.row)))

    const smallestDistances = []
    for(let i = 0; i < prevDistances.length; i++) {
        if (newDistances[i] < prevDistances[i]) {
            smallestDistances.push(newDistances[i])
        } else smallestDistances.push(prevDistances[i])
    }
    //Now update the neighbours' distances
    for (let i = 0; i < smallestDistances.length; i++) {
        unvisitedNeigbours[i].distance = smallestDistances[i]
    }

    return unvisitedNeigbours
}

function checkEndReached(nodesInVisitedOrder) {
    for (let i = 0; i < nodesInVisitedOrder.length; i++) {
        if (nodesInVisitedOrder[i].isEnd) {
            console.log(`End node: ${nodesInVisitedOrder[i].id}`)
            return true
        }
    }
    return false
}

function sortNodesByDistance(unvisitedNodes) {
    // Shorter distance takes preferences
    unvisitedNodes.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
    return unvisitedNodes
}
