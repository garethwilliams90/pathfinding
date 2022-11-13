import React, {useState} from 'react'
import './Node.css'
//import {nanoid} from 'nanoid'

export default function Node() {
    const [node, setNode] = useState({
        id: 1,
    })

    return (
        <div className='node'>
        </div>
    )
}