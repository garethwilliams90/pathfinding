import React, {useState, useEffect} from 'react'
import {nanoid} from "nanoid"

import Node from './Node'
import './style.css'


export default function App() {
    const [nodes, setNodes] = useState([])

    const ROWS = 8
    const COLS = 12
    
    // On first render --> create 2D array of nodes
    useEffect(() => {
        for(let col = 0; col < COLS; col++) {
            const currentRow = []
            for (let row = 0; row < ROWS; row++) {
                currentRow.push([])
            }
            setNodes(prevState => [...prevState, currentRow])
        }
    }, [])

    console.log(nodes)

    return (
        <div>
            <h1>App Component</h1>
            <div className='grid'>
                {nodes.map((row, rowIdx) => {
                    return (
                        <div>
                            {row.map((node, nodeIdx) => 
                            <Node 
                                key={nodeIdx}
                            >
                                {nodeIdx}
                            </Node>)}
                        </div>
                    )
                })}
                <Node />
            </div>
            
        </div>
    )
}