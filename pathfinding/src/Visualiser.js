import React, { useState, useEffect } from 'react'
import { dijkstra, shortestPath, dijkVisited } from './algorithms/dijkstra'
import { dijkstraDirect, directShortestPath} from './algorithms/dijkstraModified'
import { aStar } from './algorithms/aStar'
import { aStarE } from './algorithms/aStarE'
import { depthFirst } from './algorithms/depthFirst'
import { primMaze } from './primMaze'

import Node from './Node'
import NavBar from './NavBar'

import './style.css'

export default function Visualiser(props) {
    const ROWS = 18
    const COLS = 42

    const [nodes, setNodes] = useState([])
    const [walls, setWalls] = useState([])
    const [weights, setWeights] = useState([])

    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)
    const [startNode, setStartNode] = useState({})
    const [endNode, setEndNode] = useState({})

    const [algoOn, setAlgoOn] = useState(false)
    const [keyPressed, setKeyPressed] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)
    const [aStarOn, setAStarOn] = useState(false)
    const [diagOn, setDiagOn] = useState(false)

    const [timer, setTimer] = useState(0)
    const [timerOn, setTimerOn] = useState(false)

    const [pathLength, setPathLength] = useState(0)
    const [nodesVisited, setNodesVisited] = useState(0)
    const [livePath, setLivePath] = useState(false)

    // On first render --> create 2D array of nodes
    useEffect(() => {
        for (let col = 1; col < COLS + 1; col++) {
            const currentRow = []
            for (let row = 1; row < ROWS + 1; row++) {
                const currentNode = {
                    // Positional
                    col,
                    row,
                    id: ((COLS) * (row - 1)) + col,
                    previousNode: null,
                    parentNode: null,

                    // Booleans
                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    isVisited: false,
                    isCurrent: false,
                    isBeingConsidered: false,
                    isPath: false,

                    // Distances
                    distance: Infinity,
                    weight: 0,
                    fScore: Infinity,
                    gScore: Infinity,
                    hScore: Infinity,  
                }
                currentRow.push(currentNode)
            }
            setNodes(prevState => [...prevState, currentRow])
        }
    }, [setWalls])

    function handleCheck() {
        setDiagOn(prevState => !prevState)
    }

    function handleLivePath() {
        setLivePath(prevState => !prevState)
    }

    function handleClick(node) {
        if (!node.isWall && !startClicked && !endClicked && !node.isEnd) {
            node.isStart = true
            setStartClicked(true)
            setStartNode(node)
        }
        else if (!node.isWall && startClicked && !endClicked && !node.isStart) {
            node.isEnd = true
            setEndClicked(true)
            setEndNode(node)
        }
    }
    
    function handleDoubleClick(node) {
        if (node.isStart) {
            // set the end node to the new start node
            // and get ready to click the end node
            node.isStart = !node.isStart
            endNode.isEnd = false
            endNode.isStart = true
            setEndNode({})
            setEndClicked(false)
            setStartNode(endNode)
            setStartClicked(true)
        }
        if (node.isEnd) {
            node.isEnd = !node.isEnd
            setEndClicked(false)
            setEndNode({})
            
        }
        if (node.weight > 0) {
            node.weight -= 2
        }
    }

    // Drag draws walls or weights depending on whether Space bar is pressed
    function handleDrag(node) {
        setWall(node)
    }

    function handleMouseOver(node) {
        if (keyPressed) setWeight(node)
        if (mouseDown) setWall(node)
    }

    function handleMouseDown() {
        setMouseDown(true)
    }

    function handleMouseUp() {
        setMouseDown(false)
    }

   function setWeight(node) {
        if (!node.isStart && !node.isEnd && !node.isWall) {
            if (node.weight > 0) {
                node.weight = 0
            }
            else node.weight += 2
            setWeights(prevWeights => [...prevWeights, node.id])
        }
   }

    function setWall(node) {
        if (!node.isStart && !node.isEnd) { 
            node.isWall = !node.isWall
            setWalls(prevWalls => [...prevWalls, node.id])
        }
    }

    // Generates new set of walls
    function generateWalls() {
        setWalls([])
        setWeights([])
        setAlgoOn(false)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].length; j++) {
                const node = nodes[i][j]
                // Check the node is not a start or end node
                if (!node.isStart && !node.isEnd) {
                    // Booleans
                    node.isWall = Math.round(Math.random() < 0.28)  
                    node.isVisited = false
                    node.isCurrent = false
                    node.isBeingConsidered = false
                    node.isPath = false
                    // Distances
                    node.distance = Infinity
                    node.weight = 0
                    // Positional
                    node.previousNode = null
                    node.parentNode = null
                    setWalls(prevState => [...prevState, node.isWall ? node : null])
                }  
            }
        }
    }
    // Generates a random maze of walls
    function generateMaze() {
        resetBoard()
        setStartClicked(false)
        setEndClicked(false)
        setEndNode({})
        setStartNode({})
        primMaze(nodes, props.sliderValue)
    }

    const nodeElements = nodes.map((row, rowIdx) => {
        return (
            <div key={rowIdx}
                className="node-grid"
            >
                {row.map(node => {
                    const {
                        //Positional
                        col,
                        row,
                        id,
                        previousNode,
                        parentNode,

                        // Boolean
                        isStart,
                        isEnd,
                        isWall,
                        isVisited,
                        isCurrent,
                        isBeingConsidered,
                        isPath,

                        //Distance
                        distance,
                        weight,
                        fScore,
                        gScore,
                        hScore} = node
                    return (
                        <Node
                            // Positional
                            key={id}
                            col={col}
                            row={row}
                            id={id}
                            previousNode={previousNode}
                            parentNode={parentNode}
                            // Booleans
                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                            isVisited={isVisited}
                            isCurrent={isCurrent}
                            isBeingConsidered={isBeingConsidered}
                            isPath={isPath}
                            // Distances
                            distance={distance}
                            weight={weight}
                            fScore={fScore}
                            gScore={gScore}
                            hScore={hScore}
                            // Events
                            handleClick={() => handleClick(node)}
                            handleDoubleClick={() => handleDoubleClick(node)}
                            handleDrag={() => handleDrag(node)}
                            handleMouseOver={() => handleMouseOver(node)}
                            handleMouseDown={handleMouseDown}
                            handleMouseUp={handleMouseUp}
                            //setWall={() => setWall(node)}
                        >
                            {node.weight > 0 ? <div className='node-weight'></div>: weight}
                        </Node>)
                })
                }
            </div>
        )
    })

    useEffect(() => {
        //console.log("Running dijkstra's...")
    }, [algoOn])

    // Refresh rate of animations
    const [time, setTime] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 10);
        return () => {
            clearInterval(interval);
        };
    }, []);


    // Display run time automatically
    useEffect(() => {
        let interval = null;
        if (timerOn && algoOn) {
          interval = setInterval(() => {
            setTimer(t => t + 10);
          }, 1);
        } else if (!timerOn && timer !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [timerOn, timer, algoOn]);


    // Update status on W key
    useEffect(() => {
        const onESC = (ev) => {
          if (ev.key === "w") setKeyPressed(prevState => !prevState)
        }
        window.addEventListener("keyup", onESC, false);
        return () => {
          window.addEventListener("keyup", onESC, false);
        }
      }, [])

    async function runDijkstra() {
        clearPaths()
        setTimerOn(true)
        setAlgoOn(true)
        // Wait until dijkstra returns a value before going on to next line
        const {visitedNumber, nodesInVisitedOrder}  = await dijkstra(startNode, endNode, nodes, props.sliderValue, diagOn)
        const {dijkPath} = await shortestPath(endNode, props.sliderValue)
        setPathLength(dijkPath)
        setNodesVisited(visitedNumber)
        setAlgoOn(false)
    }

    async function runDijkstraDirect() {
        clearPaths()
        setTimerOn(true)
        setAlgoOn(true)
        // Wait until dijkstra returns a value before going on to next line
        const {visitedNumber, nodesInVisitedOrder} = await dijkstraDirect(startNode, endNode, nodes, props.sliderValue)
        const {path, dijkDirectPath} = await directShortestPath(endNode, props.sliderValue)
        setPathLength(dijkDirectPath)
        setNodesVisited(visitedNumber)
        setAlgoOn(false)
    }

    async function runAStar() {  
        clearPaths()  
        setTimerOn(true)
        setAlgoOn(true)
        setAStarOn(true)
        // Wait until aStar returns a value before visualising the path
        const {aStarLength, visitedNumber} = await aStar(startNode, endNode, nodes, props.sliderValue, diagOn, livePath)
        setPathLength(aStarLength)
        setNodesVisited(visitedNumber)
        setAStarOn(false)
        setAlgoOn(false)
    }

    async function runAStarE() {  
        clearPaths()  
        setTimerOn(true)
        setAlgoOn(true)
        setAStarOn(true)
        // Wait until aStar returns a value before visualising the path
        const {aStarELength, visitedNumber} = await aStarE(startNode, endNode, nodes, props.sliderValue, diagOn, livePath)
        setPathLength(aStarELength) 
        setNodesVisited(visitedNumber)
        setAStarOn(false)
        setAlgoOn(false)
    }

    async function runDepthFirst() {
        clearPaths()
        setTimerOn(true)
        setAlgoOn(true)
        // Wait until aStar returns a value before visualising the path
        const {nodesVisited, depthFirstLength} = await depthFirst(startNode, endNode, nodes, props.sliderValue) 
        setPathLength(depthFirstLength)
        setNodesVisited(nodesVisited)
        setAlgoOn(false)
    }

    // Clear all path nodes
    function resetBoard() {
        clearPaths()
        setWalls([])
        setWeights([])
        setEndClicked(false)
        setStartClicked(false)
        setEndNode({})
        setStartNode({})
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].length; j++) {
                const node = nodes[i][j]
                node.isWall = false
                node.weight = 0 
                node.isStart = false
                node.isEnd = false
            }
        }
    }

    // Total reset of all nodes and state
    function clearPaths() {
        setAlgoOn(false)
        setTimerOn(false)
        setPathLength(0)
        setNodesVisited(0)
        setTimer(0)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].length; j++) {
                const node = nodes[i][j]
                // Booleans
                //node.isWall = false
                node.isVisited = false
                node.isCurrent = false
                node.isBeingConsidered = false
                node.isPath = false  
                // Positional
                node.previousNode = null
                node.parentNode = null
                // Distance
                node.distance = Infinity
                //node.weight = 0 
                node.fScore = Infinity
                node.gScore = Infinity
                node.hScore = Infinity    
            }
        }
    }
   
    return (
        <div>
            <NavBar 
                algoOn={algoOn}
                aStarOn={aStarOn}
                generateWalls={generateWalls}
                generateMaze={generateMaze}
                runDijkstra={runDijkstra}
                runDijkstraDirect={runDijkstraDirect}
                runAStar={runAStar}
                runAStarE={runAStarE}
                runDepthFirst={runDepthFirst}
                resetBoard={resetBoard}
                clearPaths={clearPaths}
                time={time}
                keyPressed={keyPressed}
                diagOn={diagOn}
                livePath={livePath}
                handleLivePath={handleLivePath}
                handleCheck={handleCheck}
            />
            <div className='grid'>  
                {nodeElements}
            </div>
            <div className='stats'>
                <div className='stat-box'></div>
                <div className='stat-text'>
                    <div className='time'>Time: {timer} ms</div>
                    <div className='cells-searched'>Cells Searched: {nodesVisited} </div>
                    <div className='path-length'>Path Length: {pathLength} </div>
                </div>

            </div>
        </div>
    )
}