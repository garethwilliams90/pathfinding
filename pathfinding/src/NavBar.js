import React from 'react'
import Visualiser from './Visualiser'

import './Nav.css'

export default function NavBar(props) {

    return (
        <div className='nav'>
            
            <button 
            className='dijkstra'
            onClick={props.runDijkstra}
            >
                Run Dijkstra's
            </button>

        </div>
    )
}