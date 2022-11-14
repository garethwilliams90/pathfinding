import React, {useState, useEffect} from 'react'
import {nanoid} from "nanoid"

import Node from './Node'
import './style.css'

import dijkstra from './algorithms/dijkstra'


export default function Visualiser() {
    const ROWS = 8
    const COLS = 12

    const [nodes, setNodes] = useState([])
    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)

    const [walls, setWalls] = useState([])
    const [startNode, setStartNode] = useState({})
    const [endNode, setEndNode] = useState({})

    const [algoOn, setAlgoOn] = useState(false)
    
    

    // On first render --> create 2D array of nodes
    useEffect(() => {
        for(let col = 1; col < COLS+1; col++) {
            const currentRow = []
            for (let row = 1; row < ROWS+1; row++) {
                const currentNode = {
                    col,
                    row,
                    id: ((COLS-1) * (row-1)) + col,

                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    isVisited: false,
                    isCurrent: false,

                    distance: Infinity,
                }
                currentRow.push(currentNode)
            }
            setNodes(prevState => [...prevState, currentRow])
        }
    }, [])

    
    function handleClick(node) {
        if (!startClicked && !endClicked) {
            console.log(`Setting start at ${node.id}`)
            node.isStart = true
            setStartClicked(true)
            setStartNode(node)
        }
        else if (startClicked && !endClicked) {
            console.log(`Setting end at ${node.id}`)
            node.isEnd = true
            setEndClicked(true)
            setEndNode(node)
            
        }
        console.log(`isStart = ${startClicked}`)
        console.log(`isEnd = ${endClicked}`)
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
            console.log(`Set wall at ${node.id}`)
            node.isWall = !node.isWall
            setWalls(prevWalls => [...prevWalls, node.id])
            
        }
    }

    // Renders for walls
    useEffect(() => {
        //setNodes(prevState => [...prevState])
    }, [walls])
    

    const nodeElements = nodes.map((row, rowIdx) => {
        return (
            <div key={rowIdx}
            className="node-grid"
            >
                {row.map((node, nodeIdx) => {
                    const {
                        col,
                        row,
                        id,
                        isStart,
                        isEnd,
                        isWall,
                        isVisited,
                        isCurrent,
                        distance} = node
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
                            distance={distance}

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
        console.log("run dijkstra..")
    }, [algoOn])
    
    function runDijkstra() {
        dijkstra(startNode, endNode, nodes)
        setAlgoOn(true)
    }
    

    return (
        <div>
            <div className='nav'>
                <button 
                className='button dijkstra'
                onClick={runDijkstra}
                >
                    Run Dijkstra's
                </button>
            </div>
        
            <div className='grid'>
                {nodeElements}
            </div>
            
        </div>
        
        
    )
}