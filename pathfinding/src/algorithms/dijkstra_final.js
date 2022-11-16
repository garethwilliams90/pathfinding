// DIJKSTRA's ALGORITHM
const SPEED = 20
// Takes the startNode, endNode and the 2D array of all nodes
export async function dijkstra(start, end, grid) {
    // Create a single array with all nodes & create a copy
    const nodes = linearNodes(grid)
    let nodesCopy = [...nodes]
    // Reset all nodes when function is called --> keep walls
    nodes.map(node => (node.isVisited = false,
         node.isCurrent = false,
         node.isBeingConsidered = false,
         node.isPath = false))
    

    const nodesInVisitedOrder = []
    // Mark ALL nodes as unvisited
    const unvisited = [...nodesCopy]
    // Set start distance = 0 
    start.distance = 0

    // While there are still unvisited nodes
    while (!nodesInVisitedOrder.includes(end)) {
        
        // sort unvisited by distance
        sortUnvisitedByDistance(unvisited)
        
        // set current (closest) as min distance node --> first time give startNode
        const current = unvisited[0]
        current.isCurrent = true

        // if current is wall --> continue
        if (current.isWall) continue
    
        // if current.distance === infinity --> return --> since trapped
        if (current.distance === Infinity) return nodesInVisitedOrder
    
        // else --> set current to visited and add to visited set .push()
        await sleep(SPEED)
        current.isVisited = true
        nodesInVisitedOrder.push(current)
        //console.log("Nodes in visited order: ",nodesInVisitedOrder)
        // Remove current node from the unvisited set
        unvisited.splice(0,1)
    
        // if current is endNode --> return 
        if (current.isEnd) return nodesInVisitedOrder
    
        // else --> update unvisited neighbours' distances 
        updateUnvisitedNeighbours(current, grid)
        current.isCurrent = false
    } 
}

// WORKING CORRECTLY
async function updateUnvisitedNeighbours(current, grid) {
    // First need to get all the unvisited neighbours
    const neighbours = getUnvisitedNeighbours(current, grid)
    
    // Go through neighbours and re-assign their distances
    for (let i = 0; i < neighbours.length; i++) {
        neighbours[i].distance = current.distance + 1
        neighbours[i].previousNode = current
        neighbours[i].isBeingConsidered = true
        await sleep(SPEED)
    }
}

// WORKING CORRECTLY
function getUnvisitedNeighbours(current, grid) {
    // Gets all the unvisited neighbours of the current node
    const neighbours = []
    const {row, col} = current

    // Above --> only get above if not at the top
    if (row > 1) neighbours.push(grid[col-1][row-2])
    // Below --> only get below if not at bottom
    if (row < grid[0].length) neighbours.push(grid[col-1][row])
    // Left --> only get left if not at far left col
    if (col > 1) neighbours.push(grid[col-2][row-1])
    // Right --> only get right if not at far right col
    if (col < grid.length) neighbours.push(grid[col][row-1])

    // Neighbours must be: adjacent, not wall, not current, not visited
    const filtered = neighbours.filter(node => !node.isWall && !node.isVisited && !node.isCurrent)
    return filtered 
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

// WORKING CORRECTLY
function sortUnvisitedByDistance(unvisited) {
     // Shorter distance takes preferences
     unvisited.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// WORKING CORRECTLY
export async function shortestPath(endNode) {
    // Uses the previousNode prop to calculate the shortest path
    // Dijkstra's algorithm took
    const shortestPath = []
    let currentNode = endNode
    while (currentNode !== null) {
        // Go down the line of previous nodes
        shortestPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }

    // Colour the nodes
    
    for (let i = 0; i < shortestPath.length; i++) {
        await sleep(SPEED)
        shortestPath[i].isPath = true
    }
    return shortestPath
}

