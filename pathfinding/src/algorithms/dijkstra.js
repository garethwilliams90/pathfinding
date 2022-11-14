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

export default function dijkstra(start, end, nodeArray) {

    // Defining constants
    let visitedNodesInOrder = []
    const nodes = createLinearArray(nodeArray)
    let unvisitedNodes = [...nodes]

    // Set start node as distance = 0
    // All distance default as infinity
    start.distance = 0

    // Set starting node as current
    start.isCurrent = true

    console.log(nodes)
}

function createLinearArray(nodeArray) {
    let nodes = []
    for (let i = 0; i < nodeArray.length; i++) {
        for (let j = 0; j < nodeArray[i].length; j++) {
            nodes.push(nodeArray[i][j])
        }
    }
    return nodes
}
