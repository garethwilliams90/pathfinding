const ROWS = 8
const COLS = 12

export function dijk(start, end, grid) {
    
    // Mark all nodes unvisited. 
    // Create a set of all the unvisited nodes called the unvisited set.
    const unvisited = [...grid]
        console.log("Unvisited ",unvisited)
    const nodesInOrderVisited = []
    const linearNodes = linearNodeArray(grid)
        console.log("LinearNodes: ",linearNodes)
    

    // Zero for our initial node
    start.distance = 0
        console.log("StartNode ",start)
        console.log("EndNode ",end)

    // During algorithm, tentative distance of node v is length 
    // of shortest path discovered so far between node v and the starting node

    //Set the initial node as current
    start.isCurrent = true
    const currentNode = start
        console.log("CurrentNode: ", currentNode)

    // Repeat following steps for the given currentNode
    // Stop this process if the end is reached or if smallest distance
    // amongst unvisited nodes is Infinity
    const unvisitedMin = minUnivisitedDistance(unvisited)
    
    let count = 0
    while (count < 1) {
        //while(unvisitedMin !== Infinity || !end.isVisited ) {        
        //}
        console.log(count)
        count++;
        
        proceedWithCurrent(currentNode, linearNodes)
        
        end.isVisited = true
    }
}

function minUnivisitedDistance(unvisited) {
    const linearUnvisited = linearNodeArray(unvisited)
    const sorted = linearUnvisited.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
       // console.log("Array sorted by distance: ",sorted)
    const min = sorted[0]
       // console.log("Closest unvisited node: ", min)
    return min
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

function getCurrentIndex(current) {
    const rowNum = current.row
    const colNum = current.col
    const arrayIndex = ((colNum - 1) * ROWS) + (rowNum - 1)
        console.log(arrayIndex)
    return arrayIndex
}

function getCurrentUnvisitedNeighbours(current, allNodes) {
    const neighbours = []
    const currentIndex = getCurrentIndex(current)
        console.log(allNodes)
    
    // Neighbours cant be VISITED, WALLS or CURRENT
    //4 adjacent neighbours in each direction
    const {col, row} = current

    if (row === ROWS) {
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
    }

    else if (row === 1) {
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
    }
    else {
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
    }

    console.log("Neighbours: ",neighbours)
    return neighbours
}

function proceedWithCurrent(currentNode, linearNodes) {
    console.log("Proceeding: CurrentNode: ", currentNode)

    // For current node: consider all unvisited neighbours
    const neigbours = getCurrentUnvisitedNeighbours(currentNode, linearNodes)
}