import React, { useState, useEffect } from 'react'
import Node from './Node'
import { dijkstra, shortestPath } from './algorithms/dijkstra'
import { aStar } from './algorithms/astar'
import {Slider, sliderValue} from './slider'


import './style.css'

export default function Visualiser() {
    const ROWS = 15
    const COLS = 30

    const [nodes, setNodes] = useState([])
    const [walls, setWalls] = useState([])

    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)
    const [startNode, setStartNode] = useState({})
    const [endNode, setEndNode] = useState({})

    const [algoOn, setAlgoOn] = useState(false)

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
                    previousNode: null,
                }
                currentRow.push(currentNode)
            }
            setNodes(prevState => [...prevState, currentRow])
        }
    }, [setWalls])

    function handleClick(node) {
        if (!node.isWall && !startClicked && !endClicked) {
            //console.log(`Setting start at ${node.id}`)
            node.isStart = true
            setStartClicked(true)
            setStartNode(node)
        }
        else if (!node.isWall && startClicked && !endClicked) {
            //console.log(`Setting end at ${node.id}`)
            node.isEnd = true
            setEndClicked(true)
            setEndNode(node)
        }
        //console.log(`isStart = ${startClicked}`)
        //console.log(`isEnd = ${endClicked}`)
    }

    function handleDoubleClick(node) {
        console.log(`Double clicked ${node.id}`)
        if (node.isStart) {
            node.isStart = !node.isStart
            setStartClicked(false)
            setStartNode(null)
        }
        if (node.isEnd) {
            node.isEnd = !node.isEnd
            setEndClicked(false)
            setEndNode(null)
        }
    }

    function setWall(node) {
        if (!node.isStart && !node.isEnd) {
            // console.log(`Set wall at ${node.id}`)
            node.isWall = !node.isWall
            setWalls(prevWalls => [...prevWalls, node.id])
        }
    }

    function generateWalls() {
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
                    setWalls(prevState => [...prevState, node.isWall ? node : null])
                }  
            }
        }
    }


    // Re-renders for walls
    useEffect(() => {
        //setNodes(prevState => [...prevState])
    }, [walls, nodes])


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
                            previousNode={previousNode}

                            handleClick={() => handleClick(node)}
                            handleDoubleClick={() => handleDoubleClick(node)}
                            setWall={() => setWall(node)}
                        ></Node>)
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


    async function runDijkstra() {
        setAlgoOn(true)
        // Wait until dijkstra returns a value before going on to next line
        await dijkstra(startNode, endNode, nodes)
        setAlgoOn(false)
        shortestPath(endNode)
    }

    function runAStar() {    
        setAlgoOn(true)
        aStar(startNode, endNode, nodes) 
    }

    // Total reset of all nodes and state
    function resetBoard() {
        setWalls([])
        setStartClicked(false)
        setEndClicked(false)
        setStartNode({})
        setEndNode({})
        setAlgoOn(false)

        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[i].length; j++) {
                const node = nodes[i][j]
                node.isStart = false
                node.isEnd = false
                node.isWall = false
                node.isVisited = false
                node.isCurrent = false
                node.isBeingConsidered = false
                node.isPath = false         
            }
        }
    }
    
   
    return (
        <div>
            <div className='nav'>
                <button
                        className='button reset'
                        onClick={resetBoard}
                        disabled={algoOn}
                >
                    Reset Board
                </button>
                <button
                        className='button generate-walls'
                        onClick={generateWalls}
                        disabled={algoOn}
                >
                    Generate Walls
                </button>
                <button
                    className='button algo-button dijkstra'
                    onClick={runDijkstra}
                    disabled={algoOn}
                >
                    Dijkstra's
                </button>
                <button
                    className='button algo-button astar'
                    onClick={runAStar}
                    disabled={algoOn}
                >
                    A* Search
                </button>

                <Slider 
                    algoOn={algoOn}
                    
                />
            </div>

            <div className='grid'>
                {nodeElements}
            </div>

        </div>


    )
}