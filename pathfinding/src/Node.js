import React, {useEffect, useState} from 'react'
import './Node.css'

export default function Node(props) {

    // Determines the colours of the nodes when state is changed
    const styles = {
        backgroundColor: 
        props.isPath ? "#0f03ff"
        : props.isCurrent ? "#ff7300"
        : props.isStart ? "#6f1cff" 
        : props.isEnd ? "#ff1c6b" 
        : props.isWall ? "#06031c"
        : props.isVisited ? "#35c441"
        : props.isBeingConsidered ? "#3ba361"
        : "#3b394a"
    }

    // const extraClassName = props.isEnd
    //   ? 'node-end'
    //   : props.isCurrent
    //   ? 'node-current'
    //   : props.isStart
    //   ? 'node-start'
    //   : props.isWall
    //   ? 'node-wall'
    //   : props.isBeingConsidered
    //   ? 'node-considered'
    //   : props.isVisited
    //   ? 'node-visited'
    //   : '';
    

    return (
        <div 
            className='node'
            //className={`node ${extraClassName}`}
            style={styles}
            onClick={props.handleClick}
            onDoubleClick={props.handleDoubleClick}
            onDragEnter={props.setWall}
        >
           
        </div>
    )
}