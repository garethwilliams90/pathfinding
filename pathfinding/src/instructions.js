import React , {useState} from 'react'
import wallsImg from './images/wallsImg.png'
import weightsImg from './images/weightsImg.png'
import dijkstraImg from './images/dijkstraImg.png'
import mazeImg from './images/mazeImg.png'
import sliderImg from './images/sliderImg.png'

export default function Instructions(props) {

    return (
        <>
            {props.instructions ? 
            <div className='inst instruct-box'>
                <div className='inst instruct-inner-box'>
                    <h1 className='inst instruct-title'>Pathfinding Algorithm Visualiser Instructions</h1>
                    <h3 className='inst instruct-text'>Welcome to my Pathfinding Algorithm Visualiser!</h3>
                    <h4 className='inst'>This application will help you understand how pathfinding algorithms work to find the fastest (most optimal) path, between two points.</h4>
                    <p className='inst'><strong className='inst'>1.</strong> Set the starting point by clicking once on one of the squares in the grid. Do the same again to set the end point.</p>
                    <p className='inst'><strong className='inst'>2.</strong> Add Walls to the grid to give the algorithms more of a challenge in finding their way! You can do this by either dragging the mouse to draw walls or using the <img className="img" alt="" src={wallsImg}/> or <img className="img" alt="" src={mazeImg}/> buttons.</p>
                    <p className='inst'><strong className='inst'>3.</strong> You can add Weights to the grid to simulate traffic through a path by pressing the <span className='inst'>W</span> key and mousing over the squares you want to add traffic to. <img className="img" alt="" src={weightsImg}/></p>
                    <p className='inst'><strong className='inst'>4.</strong> To begin the visualisation, click the algorithm button corresponding to the algorithm you would like to use to find the path! <img className="img" alt="" src={dijkstraImg}/></p>
                    <p className='inst'><strong className='inst'>5.</strong> Finally, to adjust the speed the algorithm runs at, move the slider along in the top right corner.<img className="img" alt="" src={sliderImg}/></p>
                    <h4 className='inst'>I hope this project helps you better understand how these algorithms work and you had fun playing with this tool! Gareth :-)</h4>
                </div>
            </div> : <></>}
        </>
    )
}
