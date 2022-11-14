import React, {useEffect, useState} from 'react'
import './Node.css'

export default function Node(props) {

    const styles = {
        backgroundColor: 
        props.isStart ? "#6f1cff" 
        : props.isEnd ? "#ff1c6b" 
        : props.isWall ? "#06031c"
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
           {/* {`${props.id}`} */} 
        </div>
    )
}