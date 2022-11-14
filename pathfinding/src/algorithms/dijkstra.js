// Begin with a set of unvisited nodes...

// Assign every node a distance of infinity --> start node is 0

// Set starting node as current node

// For each current node --> calc distance to each unvisited neighbour node...
// ... then add distance from (current to neighbour) + (neighbour to starting)

// When all neigbours of current have been mapped --> mark current as visited...
// ... remove current from Unvisited set --> will not be checked again

// If specific End node has been marked --> then stop --> FINISHED

// Else, select unvisited with smallest tentative distance and set as..
// ... the new current node 

// Repeat process getting distance of current node's unvisited neighbours

export function dijkstra(start, end, nodeArray) {

    // Defining constants
    let visitedNodesInOrder = []
    const nodes = createLinearNodeArray(nodeArray)
    let unvisitedNodes = [...nodes]

    // Set start node as distance = 0
    // All distance default as infinity
    start.distance = 0
    start.isCurrent = true

    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes)
    
        // Define the nearest node and remove first element from unvisited
        const nearestNode = unvisitedNodes.shift() 
        console.log(nearestNode)

        // Go around walls
        if (nearestNode.isWall) {
            continue
        }

        // Closest node is at Infinity so stop and return
        if (nearestNode.distance === Infinity) {
            return visitedNodesInOrder
        }

        // Otherwise, mark node as visited
        nearestNode.isVisited = true
        
        // Now add the visited nodes to the array in order
        visitedNodesInOrder.push(nearestNode)

        // If visited node was the target --> stop and return
        if (nearestNode.id === end.id) {
            console.log("Path found!")
            return visitedNodesInOrder
        }

        // Update the unvisited neighbors for the current node
        updateCurrentUnvisited(nearestNode, nodeArray) 
    }
    console.log(nodes)
    console.log("All nodes searched.")
}

function createLinearNodeArray(nodeArray) {
    let nodes = []
    for (let i = 0; i < nodeArray.length; i++) {
        for (let j = 0; j < nodeArray[i].length; j++) {
            nodes.push(nodeArray[i][j])
        }
    }
    return nodes
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeX, nodeY) => nodeX.distance - nodeY.distance)
}

function updateCurrentUnvisited(node, nodeArray) {
    console.log("updated nearest neighbour...")
    const unvisitedNeighbours = calcUnvisitedNeighbours(node, nodeArray)
    for (const adjacent of unvisitedNeighbours) {
        adjacent.distance = node.distance + 1
        adjacent.previousNode = node
    }
}

function calcUnvisitedNeighbours(node, nodeArray) {
    const neighbours = []
    const {col, row} = node

    // Find the neighbours in the 4 adjacent directions
    if (row > 0) {
        neighbours.push(nodeArray[row - 1][col])
    }
    if (row < nodeArray.length -1) {
        neighbours.push(nodeArray[row + 1][col])
    }
    if (col > 0) {
        neighbours.push(nodeArray[row][col - 1])
    }
    if (col < nodeArray[0].length-1) {
        neighbours.push(nodeArray[row][col + 1])
    }
    // Return the unvisited neighbours of node passed in
    const unvisitedNeighbours = neighbours.filter(node => !node.isVisited)
    return unvisitedNeighbours
}

export function getShortestPath(endNode) {
    const nodesInShortestPathOrder = []
    let currentNode = endNode

    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return nodesInShortestPathOrder
}