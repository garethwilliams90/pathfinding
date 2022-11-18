import React, { useState, useEffect } from 'react'
import Node from './Node'
import { dijkstra, shortestPath } from './algorithms/dijkstra'
import { aStar, aStarPath } from './algorithms/astar'

import NavBar from './NavBar'


import './style.css'

export default function Visualiser(props) {
    const ROWS = 15
    const COLS = 30

    const [nodes, setNodes] = useState([])
    const [walls, setWalls] = useState([])
    const [weights, setWeights] = useState([])

    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)
    const [startNode, setStartNode] = useState({})
    const [endNode, setEndNode] = useState({})

    const [algoOn, setAlgoOn] = useState(false)
    const [keyPressed, setKeyPressed] = useState(false)

    // On first render --> create 2D array of nodes
    useEffect(() => {
        for (let col = 1; col < COLS + 1; col++) {
            const currentRow = []
            for (let row = 1; row < ROWS + 1; row++) {
                const currentNode = {
                    col,
                    row,
                    id: ((COLS) * (row - 1)) + col,

                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    isVisited: false,
                    isCurrent: false,
                    isBeingConsidered: false,
                    isPath: false,

                    distance: Infinity,
                    weight: 0,
                    previousNode: null,
                }
                currentRow.push(currentNode)
            }
            setNodes(prevState => [...prevState, currentRow])
        }
    }, [setWalls])

    function handleClick(node) {
        if (!node.isWall && !startClicked && !endClicked) {
            node.isStart = true
            setStartClicked(true)
            setStartNode(node)
        }
        else if (!node.isWall && startClicked && !endClicked) {
            node.isEnd = true
            setEndClicked(true)
            setEndNode(node)
        }
    }
    
    function handleDoubleClick(node) {
        if (node.isStart) {
            node.isStart = !node.isStart
            setStartClicked(false)
            setStartNode({})
        }
        if (node.isEnd) {
            node.isEnd = !node.isEnd
            setEndClicked(false)
            setEndNode({})
        }
    }

    // Drag draws walls or weights depending on whether Space bar is pressed
    function handleDrag(node) {
        if (keyPressed) setWeight(node)
        else setWall(node)
    }

    function handleMouseOver(node) {
        if (keyPressed) setWeight(node)
    }

   function setWeight(node) {
        if (!node.isStart && !node.isEnd && !node.isWall) {
            if (node.weight > 0) {
                node.weight = 0
            }
            else node.weight += 4
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
                    node.isWall = Math.round(Math.random() < 0.28)  
                    node.isVisited = false
                    node.isCurrent = false
                    node.isBeingConsidered = false
                    node.isPath = false
                    node.distance = Infinity
                    node.weight = 0
                    node.previousNode = null
                    setWalls(prevState => [...prevState, node.isWall ? node : null])
                }  
            }
        }
    }

    // Re-renders for walls
    useEffect(() => {
        //setNodes(prevState => [...prevState])
    }, [walls, weights, nodes, startNode, endNode])


    const nodeElements = nodes.map((row, rowIdx) => {
        return (
            <div key={rowIdx}
                className="node-grid"
            >
                {row.map(node => {
                    const {
                        col,
                        row,
                        id,
                        isStart,
                        isEnd,
                        isWall,
                        isVisited,
                        isCurrent,
                        isBeingConsidered,
                        isPath,
                        distance,
                        weight,
                        previousNode } = node
                    return (
                        <Node
                            key={id}
                            col={col}
                            row={row}
                            id={id}

                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                            isVisited={isVisited}
                            isCurrent={isCurrent}
                            isBeingConsidered={isBeingConsidered}
                            isPath={isPath}
                            distance={distance}
                            weight={weight}
                            previousNode={previousNode}
                            
                            handleClick={() => handleClick(node)}
                            handleDoubleClick={() => handleDoubleClick(node)}
                            handleDrag={() => handleDrag(node)}
                            handleMouseOver={() => handleMouseOver(node)}
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
          if (ev.key === "w") {
            setKeyPressed(prevState => !prevState)
            console.log(`Weight key pressed: ${keyPressed}`)
          }
        }
        window.addEventListener("keyup", onESC, false);
        return () => {
          window.addEventListener("keyup", onESC, false);
        }
      }, [])

    async function runDijkstra() {
        setAlgoOn(true)
        // Wait until dijkstra returns a value before going on to next line
        await dijkstra(startNode, endNode, nodes, props.sliderValue)
        shortestPath(endNode, props.sliderValue)
        setAlgoOn(false)
    }

    async function runAStar() {    
        setAlgoOn(true)
        // Wait until aStar returns a value before visualising the path
        await aStar(startNode, endNode, nodes, props.sliderValue) 
        aStarPath(endNode, props.sliderValue)
        setAlgoOn(false)
    }

    // Total reset of all nodes and state
    function resetBoard() {
        setWalls([])
        setWeights([])
        setAlgoOn(false)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].length; j++) {
                const node = nodes[i][j]
                node.isWall = false
                node.isVisited = false
                node.isCurrent = false
                node.isBeingConsidered = false
                node.isPath = false  
                node.weight = 0
                node.previousNode = null
                node.distance = Infinity     
            }
        }
    }
    
   
    return (
        <div>
            <NavBar 
                algoOn={algoOn}
                generateWalls={generateWalls}
                runDijkstra={runDijkstra}
                runAStar={runAStar}
                resetBoard={resetBoard}
                time={time}
            />
            <div className='grid'>  
                {nodeElements}
            </div>
        </div>
    )
}