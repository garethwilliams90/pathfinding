import React, {useState, useEffect} from 'react'
import {nanoid} from "nanoid"

export default function App() {
    
    // Define a node object and give it state
    const [node, setNode] = useState({
        id: nanoid(),
        row: null,
        col: null,

        isStartNode: false,
        isEndNode: false,
        isWallNode: false,
        isCurrentNode: false,
        hasBeenChecked: false,
        isClicked: false,
        distance: null,
    })

    function createNode() {

    }

    const column = [node.id,node.id,node.id]
    const array = [column, column, column]


    return (
        <div>
            {array}
        </div>
    )
}
