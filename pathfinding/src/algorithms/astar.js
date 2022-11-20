// A-STAR ALGORITHM

// Takes a start, end and grid, and returns best path
export async function aStar(start, end, grid, SPEED) {
    // Create a single array with all nodes & create a copy
    const nodes = linearNodes(grid)
    // Reset all nodes when function is called --> keep walls
    nodes.map(node => (node.isVisited = false,
        node.isCurrent = false,
        node.isBeingConsidered = false,
        node.isPath = false))

    // Create an open set to store the queue
    const openSet = []
    const closedSet = []

    // Add the startNode to the openSet
    openSet.push(start)
    console.log(openSet)
    let count = 0
    while (openSet.length > 0 || count > 1) {
        count++
        const current = getLowestFScore(openSet)
        console.log(current)
        current.isCurrent = true
        current.isVisited = true
        // If the current node is the endNode --> stop
        if (current.isEnd) return
        // Push current onto closedList
        closedSet.push(current)
        // Remove current from openSet
        current.isCurrent = false
        const currentIdx = openSet.indexOf(current)
        openSet.splice(currentIdx, 1)

        // Get the current neighbours & iterate
        const neighbours = getNeighbours(current, grid)
        //console.log(neighbours)
        await sleep(SPEED)
        for (let i = 0; i < neighbours.length; i++) {

            let node = neighbours[i]
            const gScore = getGScore(node)
            const fScore = getFScore(node)
            const hScore = getHScore(node, end)
            const parentNode = getParent(node)

            // If neighbour not in openSet
            if (!openSet.includes(node)) {
                // Save g, h, f, and parent node
                node.gScore = gScore
                node.fScore = fScore
                node.hScore = hScore
                node.parentNode = parentNode
                // Add the neighbour to the openSet
                openSet.push(node) 
            }
            // Node IS in openset AND new g is less than previous g 
            if (openSet.includes(node) && gScore < node.gScore) {
                // Save g and f and parent
                node.gScore = gScore
                node.fScore = fScore
                node.parentNode = parentNode
                node.isBeingConsidered = true
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getParent(node) {

}

function getGScore(node) {

}

function getFScore(node) {
    return (node.gScore + node.hScore)
}

// Manhattan distance
function getHScore(node, end) {
    const x = Math.abs(node.col - end.col)
    const y = Math.abs(node.row - end.row)
    return x + y
}

// Gets all of the neighbours of the current node
function getNeighbours(current, grid) {
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

// sorts set by fScore and returns the first element 
function getLowestFScore(set) {
    const lowest = sortByFScore(set)[0]
    return lowest
}

// Sorts nodes in the set by fScore
function sortByFScore(set) {
    // Lower fScores take preference
    set.sort((a, b) => (a.fScore > b.fScore) ? 1 : -1)
    return set
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
export async function aStarPath(endNode, SPEED) {
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
        shortestPath[i].current = true
    }
    console.log(shortestPath)
    return shortestPath
}