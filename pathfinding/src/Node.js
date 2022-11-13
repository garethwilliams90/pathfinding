import React, {useEffect, useState} from 'react'
import './Node.css'

export default function Node(props) {
    const [startClicked, setStartClicked] = useState(false)
    const [endClicked, setEndClicked] = useState(false)

    // Node is an object with the following properties
    const [node, setNode] = useState({
        row: props.row,
        col: props.col,
        id: (props.row+1) * (props.col+1),

        isStart: false,
        isEnd: false,
        isWallNode: false,
        isCurrentNode: false,
        
        distance: 0,
    })

    

    const styles = {
        backgroundColor: props.isStart ? "green" : props.isEnd ? "red" : "white"
    }

    

    function toggleStartNode() {
        console.log(`Node ${node.id} selected!`)
        setNode(prevState => {
            return {
            ...prevState,
            isStartNode: !prevState.isStartNode
            }
        })
    }

    function handleClick() {
        if (!startClicked && !endClicked) {
            console.log("Setting start node...")
            console.log(`Start: ${node.id}`)

            setStartClicked(true)
            setNode(prevState => {
                return {
                    ...prevState,
                    isStartNode: !prevState.isStartNode
                }
            })
        }
        else if (startClicked && !endClicked) {
            // setting end node
            console.log("Setting end node...")
            console.log(`End: ${node.id}`)

            setEndClicked(true)
            setNode(prevState => {
                return {
                    ...prevState,
                    isEndNode: !prevState.isEndNode
                }
            })
        }
        
    }

    

    return (
        <div 
            className='node'
            style={styles}
            onClick={props.handleClick}
            onDoubleClick={props.handleDoubleClick}
        >
            {`${node.id}`}
        </div>
    )
}