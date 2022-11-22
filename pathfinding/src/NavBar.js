import React from 'react'

export default function NavBar(props) {

    return (
        <div className='nav'>
                {props.keyPressed ? <div className='w-box weights-on'>W</div>
                : <div className='w-box weights-off'>W</div>}
        
                <button
                        className='button reset'
                        onClick={props.resetBoard}   
                        disabled={props.aStarOn} 
                >
                    Reset Board
                </button>
                <button
                        className='button clear-paths'
                        onClick={props.clearPaths} 
                        disabled={props.aStarOn}
                >
                    Clear Paths
                </button>
                <button
                        className='button generate-walls'
                        onClick={props.generateWalls}
                        disabled={props.algoOn}
                >
                    Random Walls
                </button>
                <button
                        className='button generate-maze'
                        onClick={props.generateMaze}
                        disabled={props.algoOn}
                >
                    Generate Maze
                </button>
                <div className="algo-div">
                    <button
                        className='algo-button button dijkstra'
                        onClick={props.runDijkstra}
                        disabled={props.algoOn}
                    >
                        Dijkstra's
                    </button>
                    <button
                        className='algo-button button astar'
                        onClick={props.runAStar}
                        disabled={props.algoOn}
                    >
                        A* Search
                    </button>
                    <button
                        className='algo-button button depth'
                        onClick={props.runDepthFirst}
                        disabled={props.algoOn}
                    >
                        Depth First
                    </button>
                </div>     
        </div>
    )
}