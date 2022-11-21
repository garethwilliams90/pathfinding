import React, { useState, useEffect } from 'react'
import { dijkstra, shortestPath } from './algorithms/dijkstra'
import { aStar } from './algorithms/aStar'
import { depthFirst, depthFirstPath } from './algorithms/depthFirst'
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
    // Re-renders for walls
    // useEffect(() => {
    // }, [walls, weights, nodes, startNode, endNode])


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
        const interval = setInterval(() => setTime(Date.now()), 1);
        return () => {
            clearInterval(interval);
        };
    }, []);

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
        setAlgoOn(true)
        // Wait until dijkstra returns a value before going on to next line
        await dijkstra(startNode, endNode, nodes, props.sliderValue)
        shortestPath(endNode, props.sliderValue)
        setAlgoOn(false)
    }

    async function runAStar() {  
        clearPaths()  
        setAlgoOn(true)
        setAStarOn(true)
        // Wait until aStar returns a value before visualising the path
        await aStar(startNode, endNode, nodes, props.sliderValue) 
        setAStarOn(false)
        setAlgoOn(false)
    }

    async function runDepthFirst() {
        clearPaths()
        setAlgoOn(true)
        // Wait until aStar returns a value before visualising the path
        await depthFirst(startNode, endNode, nodes, props.sliderValue) 
        depthFirstPath(endNode, props.sliderValue)
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
                runAStar={runAStar}
                runDepthFirst={runDepthFirst}
                resetBoard={resetBoard}
                clearPaths={clearPaths}
                time={time}
                keyPressed={keyPressed}
            />
            <div className='grid'>  
                {nodeElements}
            </div>
        </div>
    )
}