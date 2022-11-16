import React, {useEffect, useState} from 'react'
import './Node.css'

export default function Node(props) {

    // Determines the colours of the nodes when state is changed
    const styles = {
        backgroundColor: 
        props.isCurrent ? "#ff7300"
        : props.isStart ? "#6f1cff" 
        : props.isEnd ? "#ff1c6b" 
        : props.isWall ? "#06031c"
        : props.isVisited ? "#35c441"
        : props.isBeingConsidered ? "#3ba361"
        : "transparent"
    }
    

    return (
        <div 
            className='node'
            style={styles}
            onClick={props.handleClick}
            onDoubleClick={props.handleDoubleClick}
            onDragEnter={props.setWall}
        >
           {`${props.id}`}
        </div>
    )
}