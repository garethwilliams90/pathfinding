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

export default function dijkstra(start, end, nodeArray, wallsArray) {
    // console.log("running dijstras...")
    console.log(`Starting at: ${start}\nEnding at: ${end}`)
    // console.log(`The walls are: ${wallsArray}`)

    console.log(nodeArray)

    // Defining constants
    const visitedNodesInOrder = []
    const unvisitedNodes = [...nodeArray]


    function getStartNode() {
        let startNode = null
        for (let i = 0; i < nodeArray.length; i++) {
            for (let j = 0; j < nodeArray[i].length; j++) {
                if (nodeArray[i][j].isStart) {
                    console.log(nodeArray[i][j])
                    startNode = nodeArray[i][j]
                }
            
            }
        }
        return startNode
    }

    function getEndNode() {
        let endNode = null
        for (let i = 0; i < nodeArray.length; i++) {
            for (let j = 0; j < nodeArray[i].length; j++) {
                if (nodeArray[i][j].isEnd) {
                    console.log(nodeArray[i][j])
                    endNode = nodeArray[i][j]
                }
            
            }
        }
        return endNode
    }

    getStartNode()
    getEndNode()



}
