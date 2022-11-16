const ROWS = 8
const COLS = 12

export function dijk(start, end, grid) {
    
    // Mark all nodes unvisited. 
    // Create a set of all the unvisited nodes called the unvisited set.
    const unvisited = [...grid]
        //console.log("Unvisited ",unvisited)
    const nodesInOrderVisited = []
    const unvisitedNodes = linearNodeArray(grid)
        //console.log("unvisitedNodes: ",unvisitedNodes)
     
    // Zero for our initial node
    start.distance = 0
        //console.log("StartNode ",start)
        //console.log("EndNode ",end)

    // During algorithm, tentative distance of node v is length 
    // of shortest path discovered so far between node v and the starting node

    //Set the initial node as current
    start.isCurrent = true
    let currentNode = start
        //console.log("CurrentNode: ", currentNode)

    // Repeat following steps for the given currentNode
    // Stop this process if the end is reached or if smallest distance
    // amongst unvisited nodes is Infinity
    
    let count = 0
    while (count < 1) {
        //while(unvisitedMin !== Infinity || !end.isVisited ) {        
        //}
        console.log(count)
        count++;
        
        proceedWithCurrent(currentNode, unvisitedNodes, nodesInOrderVisited)
        async function proceedWithCurrent(currentNode, unvisitedNodes, nodesInOrderVisited) {
            if(currentNode.isEnd) {
                console.log("Algorithm finished")
                return nodesInOrderVisited
            }
        
            console.log("Proceeding: CurrentNode: ", currentNode)
        
            await sleep(50)

            // For current node: consider all unvisited neighbours
            const neighbours = getCurrentUnvisitedNeighbours(currentNode, unvisitedNodes)
            // Update the neighbouring nodes' distances
            updateNeighbourDistances(neighbours, currentNode)
            // Finished with the current node....
            // Mark current node as VISITED
            currentNode.isVisited = true
            currentNode.isCurrent = false
            // Remove current from UNVISITED set
                // First get index of the current node in the unvisited set
            const indexOfCurrent = unvisitedNodes.findIndex(object => {
                return object.id === currentNode.id
            })
            unvisitedNodes.splice(indexOfCurrent,1)
                //console.log("New length of unvisited nodes: ", unvisitedNodes.length)
        
            // Add the current node the visited nodes set
            nodesInOrderVisited.unshift(currentNode)
                console.log("Current nodes in order Visited: ", nodesInOrderVisited)
        
            // Set the new current node as the first element of the neigbours set
            const sortedNodes = sortNodesByDistance(unvisitedNodes)
            const newCurrent = sortedNodes[0]
            console.log(newCurrent)
            await sleep(50)
            proceedWithCurrent(newCurrent, unvisitedNodes, nodesInOrderVisited)
        
        }
    }
    return nodesInOrderVisited
}

function updateNeighbourDistances(neighbours, current) {
    // First assign the currentNode, as the previous node of all of the neighbours
    neighbours.map(node => node.previousNode = current)
    
    // Then map each neighbours distance to be the previousNode's distance + 1
    neighbours.map(node => node.distance = (node.previousNode.distance + 1))
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
    
    let neighbours = []
    let currentIndex = getCurrentIndex(current)
        console.log(allNodes)
    
    // Neighbours cant be VISITED, WALLS or CURRENT
    //4 adjacent neighbours in each direction
    let {col, row} = current

    if (row === ROWS) {
        //Above: -1
        const above = allNodes[currentIndex-1]
        if (above && (!above.isWall && !above.isVisited)) {
            neighbours.unshift(above)
        }

        // Right: +ROWS
        const right = allNodes[currentIndex+ROWS]
        if (right && (!right.isWall && !right.isVisited)) {
            neighbours.unshift(right)
        }

        // Left: -ROWS
        const left = allNodes[currentIndex-ROWS]
        if (left && (!left.isWall && !left.isVisited)) {
            neighbours.unshift(left)
        }
    }

    else if (row === 1) {
        // Below: +1
        const below = allNodes[currentIndex+1]
        if (below && (!below.isWall && !below.isVisited)) {
            neighbours.unshift(below)
        }

        // Left: -ROWS
        const left = allNodes[currentIndex-ROWS]
        if (left && (!left.isWall && !left.isVisited)) {
            neighbours.unshift(left)
        }

        // Right: +ROWS
        const right = allNodes[currentIndex+ROWS]
        if (right && (!right.isWall && !right.isVisited)) {
            neighbours.unshift(right)
        }
    }
    else {
        //Above: -1
        const above = allNodes[currentIndex-1]
        if (above && (!above.isWall && !above.isVisited)) {
            neighbours.unshift(above)
        }

        // Below: +1
        const below = allNodes[currentIndex+1]
        if (below && (!below.isWall && !below.isVisited)) {
            neighbours.unshift(below)
        }

        // Left: -ROWS
        const left = allNodes[currentIndex-ROWS]
        if (left && (!left.isWall && !left.isVisited)) {
            neighbours.unshift(left)
        }

        // Right: +ROWS
        const right = allNodes[currentIndex+ROWS]
        if (right && (!right.isWall && !right.isVisited)) {
            neighbours.unshift(right)
        }
    }

    console.log("Neighbours: ",neighbours)
    neighbours.map(node => node.isBeingConsidered = true)
    return neighbours
}

function sortNodesByDistance(unvisitedNodes) {
    // Shorter distance takes preferences
    unvisitedNodes.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
    return unvisitedNodes
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}