import React, {useState, useEffect} from 'react'
import {nanoid} from "nanoid"

import Node from './Node'
import './style.css'


export default function App() {
    const [nodes, setNodes] = useState([])
    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)

    const ROWS = 7
    const COLS = 11
    
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

    
    function toggleStartClicked() {
        setStartClicked(true)
        console.log("STart node clicked....")
        Node.setStartClicked(true)
    }

    console.log(nodes)

    const nodeElements = nodes.map((row, rowIdx) => {
        return (
            <div key={rowIdx}>
                {row.map((node, nodeIdx) => 
                <Node 
                    key={nodeIdx}
                    col={rowIdx}
                    row={nodeIdx}
                    id={nodeIdx}
                    
                >
                </Node>)}
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