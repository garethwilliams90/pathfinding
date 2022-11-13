import React, {useState} from 'react'
import './Node.css'

export default function Node(props) {

    // Node is an object with the following properties
    const [node, setNode] = useState({
        row: props.row,
        col: props.col,
        id: (props.row+1) * (props.col+1),

        isStartNode: false,
        isEndNode: false,
        isWallNode: false,
        isCurrentNode: false,
        
        distance: 0,
    })

    

    const styles = {
        backgroundColor: node.isStartNode ? "green" : node.isEndNode ? "red" : "white"
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

    return (
        <div 
            className='node'
            style={styles}
            onClick={toggleStartNode}
        >
            {`id: ${node.id}`}
        </div>
    )
}