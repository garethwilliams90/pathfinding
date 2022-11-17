import React from 'react'
import {Slider, sliderValue} from './slider'



export default function NavBar(props) {

    return (
        <div className='nav'>
                <button
                        className='button reset'
                        onClick={props.resetBoard}
                        disabled={props.algoOn}
                >
                    Reset Board
                </button>
                <button
                        className='button generate-walls'
                        onClick={props.generateWalls}
                        disabled={props.algoOn}
                >
                    Generate Walls
                </button>
                <button
                    className='button algo-button dijkstra'
                    onClick={props.runDijkstra}
                    disabled={props.algoOn}
                >
                    Dijkstra's
                </button>
                <button
                    className='button algo-button astar'
                    onClick={props.runAStar}
                    disabled={props.algoOn}
                >
                    A* Search
                </button>
                
        </div>
    )
}