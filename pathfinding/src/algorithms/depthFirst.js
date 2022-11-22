// While openSet is not empty 

export async function depthFirst(start, end, grid, speed) {
    // Create a single array with all nodes & create a copy
    const nodes = linearNodes(grid)

    var openSet = []
    var current = start

    openSet.unshift(current)
    let count = 0
    while (openSet.length > 0) {
        count++
        current = openSet[0]
        current.isCurrent = true

        // End case -- result has been found, return the traced path
        if (current.isEnd) {
            var curr = current
            curr.isCurrent = false
            var ret = []
            while (curr.previousNode) {
                ret.push(curr)
                await sleep(speed)
                nodes.map(node => node.isCurrent=false)
                ret.map(node => node.isPath = true)
                curr = curr.previousNode
            }
            return ret.reverse()
        }
        // current is not the end so mark as visited
        await sleep(speed)
        current.isCurrent = false
        current.isVisited = true
        
        // remove current node from the open set
        openSet.splice(openSet.indexOf(current), 1)

        // getting the unvisited neighbours
        var neighbours = getNeighbours(current, grid)
        // add the neighbours to the open set 
        neighbours.map(node => (
            openSet.unshift(node),
             node.isBeingConsidered = true,
             node.previousNode = current))
    }
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}