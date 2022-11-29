// ASTAR

export async function aStar(start, end, grid, speed, diagOn) {
    // Create a single array with all nodes & create a copy
    const nodes = linearNodes(grid)
    // Reset all nodes when function is called --> keep walls
    nodes.map(node => (node.isVisited = false,
        node.isCurrent = false,
        node.isBeingConsidered = false,
        node.isPath = false))

    var openList = []
    var closedList = []
    start.gScore = 0
    openList.push(start)

    while (openList.length > 0) {

        // Grab the lowest f(x) to process next
        var current = getLowestFScore(openList)
        current.isBeingConsidered = true
        
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

        // Normal case -- move currentNode from open to closed, process each of its neighbors
        openList.splice(openList.indexOf(current), 1)
        closedList.push(current)
        closedList.map(node => node.isVisited = true)
        var neighbours = getNeighbours(current, grid, diagOn)
        for (let i = 0; i < neighbours.length; i++) {
            var node = neighbours[i]
            
            if (node.isWall || closedList.includes(node)) {
                // not a valid node to process, skip to next neighbor
                continue
            }
            node.isCurrent = true
            node.isBeingConsidered = true

            // g score is the shortest distance from start to current node, we need to check if
            // the path we have arrived at this neighbor is the shortest one we have seen yet
            var gScore = current.gScore + 1 + current.weight
            var gScoreIsBest = false

            if (!openList.includes(node)) {
                // This the the first time we have arrived at this node, it must be the best
                // Also, we need to take the h (heuristic) score since we haven't done so yet
                gScoreIsBest = true
                node.hScore = getHScore(node, end)
                openList.push(node)
            }
            else if (gScore < node.gScore) {
                // We have already seen the node, but last time it had a worse g (distance from start)
                gScoreIsBest = true
                node.isCurrent = false
                node.isBeingConsidered = true
            }

            if (gScoreIsBest) {
                // Found an optimal (so far) path to this node.   Store info on how we got here and
                //  just how good it really is...
                await sleep(speed)
                console.log("G-Score is best")
                node.previousNode = current
                node.gScore = gScore
                node.fScore = node.gScore + node.hScore
                node.isVisited = true
                node.isCurrent = false
                node.isBeingConsidered = false
            }
        }
    }
    // No result was found -- empty array signifies failure to find path
    console.log("Didn't find a solution")
    return []
}

// Manhattan distance
function getHScore(node, end) {
    const x = Math.abs(node.col - end.col)
    const y = Math.abs(node.row - end.row)
    return x + y
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
// Gets all of the neighbours of the current node
function getNeighbours(current, grid, diagOn) {
    const neighbours = []
    const {row, col} = current

    // Get the diagonal neighbours
    if (diagOn) {
        // NorthWest
        if (row > 1 && col > 1) neighbours.push(grid[col-2][row-2])
        // NorthEast
        if (row > 1 && col < grid.length) neighbours.push(grid[col][row-2])
        // SouthWest
        if (row < grid[0].length && col > 1) neighbours.push(grid[col-2][row])
        // SouthEast
        if (row < grid[0].length && col < grid.length) neighbours.push(grid[col][row])
    }
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