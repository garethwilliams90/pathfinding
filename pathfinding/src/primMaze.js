//Aldous Broder Maze

export function primMaze(grid) {
    const nodes = linearNodes(grid)
    // Reset all nodes when function is called --> keep walls
    nodes.map(node => (node.isVisited = false,
        node.isCurrent = false,
        node.isBeingConsidered = false,
        node.isPath = false,
        node.isStart = false,
        node.isEnd = false))
    
    const unvisited = [...nodes]
    const visitedSet = []
    nodes.map(node => node.isWall = true)

    // Pick a random cell and set as visited
    let cell = nodes[Math.round(Math.random() * nodes.length)]
    cell.isVisited = true
    cell.isWall = false
    //unvisited.splice(unvisited.indexOf(cell), 1)

    // While there are unvisited cells
    let count = 0
    while (unvisited.length > 0 && count < 30000) {
        count++

        run(cell)
            console.log(unvisited.length)

        function run(cell) {
            // Pick a random neighbour of the current cell
            const wallNeighbours = getWallNeighbours(cell, grid)
            wallNeighbours.map(node => (node.isVisited = false
                 ))
            const neighbours = getCellNeighbours(cell, grid)
            const randomNeighbour = neighbours[Math.round(Math.random()*neighbours.length)]
            if (randomNeighbour) {
                randomNeighbour.isWall = false

                // if chosen neighbour not been visited
                if (!randomNeighbour.isVisited) {
                    // Remove wall between current cell and neighbour
                    removeWall(cell, randomNeighbour, grid)
                    randomNeighbour.isVisited = true
                    
                    unvisited.splice(unvisited.indexOf(randomNeighbour),1)
                }
                // Make the neigbour the current cell and re-run
                run(randomNeighbour)
            }
        } 
    }
    nodes.map(node => node.isVisited = false)
}

function removeWall(cell, neighbour, grid) {
    const {col, row} = cell

    // Right
    if (row === neighbour.row && col < neighbour.col) {
        grid[col][row-1].isWall = false
        grid[col][row-1].isVisited =true
    }
    // Left 
    if (row === neighbour.row && col > neighbour.col) {
        grid[col-2][row-1].isWall = false
        grid[col-2][row-1].isVisited = true
    }
    // Above 
    if (col === neighbour.col && row < neighbour.row) {
        grid[col-1][row].isWall = false
        grid[col-1][row].isVisited = true
    }
    // Below
    if (col === neighbour.col && row > neighbour.row) {
        grid[col-1][row-2].isWall = false
        grid[col-1][row-2].isVisited = true
    }
}

function getVisitedNeighbours(cell, grid) {
    const neighbours = getCellNeighbours(cell, grid)
    const filtered =  neighbours.filter(node => node.isVisited)
    return filtered
}

function getWallNeighbours(current, grid) {
    // Gets all the neighbours of the current node
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

    // Neighbours must be adjacent
    return neighbours
}

function getCellNeighbours(current, grid) {
    // Gets all the neighbours of the current node
    const neighbours = []
    const {row, col} = current

    // Above --> only get above if not at the top
    if (row > 2) neighbours.push(grid[col-1][row-3])
    // Below --> only get below if not at bottom
    if (row < grid[0].length-1) neighbours.push(grid[col-1][row+1])
    // Left --> only get left if not at far left col
    if (col > 2) neighbours.push(grid[col-3][row-1])
    // Right --> only get right if not at far right col
    if (col < grid.length-1) neighbours.push(grid[col+1][row-1])

    // Neighbours must be adjacent + 1
    return neighbours
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