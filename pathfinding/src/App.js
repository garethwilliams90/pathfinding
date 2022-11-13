import React, {useState, useEffect} from 'react'
import {nanoid} from "nanoid"

import Node from './Node'
import './style.css'


export default function App() {
    const ROWS = 7
    const COLS = 11

    const [nodes, setNodes] = useState([])
    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)
    

    // On first render --> create 2D array of nodes
    useEffect(() => {
        for(let col = 1; col < COLS+1; col++) {
            const currentRow = []
            for (let row = 1; row < ROWS+1; row++) {
                const currentNode = {
                    col,
                    row,
                    id: (row) * (col),
                    isStart: false,
                    isEnd: false,
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
            setStartClicked(prevState => !prevState)
        }
        else if (startClicked && !endClicked) {
            console.log(`Setting end at ${node.id}`)
            node.isEnd = true
            setEndClicked(true)
        }
    }

    function handleDoubleClick(node) {
        console.log(`Double clicked ${node.id}`)
        if (node.isStart) {
            node.isStart = !node.isStart
            setStartClicked(false)
        }
        if (node.isEnd) {
            node.isEnd = !node.isEnd
            setEndClicked(false)
        }
    }

   

    console.log(nodes)

    const nodeElements = nodes.map((row, rowIdx) => {
        return (
            <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                    const {isStart, isEnd} = node
                    return (
                        <Node 
                            key={nodeIdx}
                            col={rowIdx}
                            row={nodeIdx}
                            id={(rowIdx+1) * (nodeIdx+1)}
                            isStart={isStart}
                            isEnd={isEnd}  
                            handleClick={() => handleClick(node)}
                            handleDoubleClick={() => handleDoubleClick(node)}
                        >{rowIdx+1 * nodeIdx+1}</Node>)
                    })      
                }
            </div>
        )
    })

    return (
        <div>
            <h1 className='title'>App Component</h1>
       
            <div className='grid'>
                {nodeElements}
            </div>
            
        </div>
    )
}