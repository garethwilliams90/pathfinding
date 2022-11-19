import React from 'react'
import './SocialIcons.css'

export default function SocialIcons() {

    return (
        <div className="icons">
            <a href="https://github.com/garethwilliams90/pathfinding" target="_blank" rel="noopener noreferrer">
                <img className="gitHub-icon icon" 
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                    alt="GitHub">   
                </img>
            </a>
            <a href="https://www.linkedin.com/in/gareth-williams-0396ab205" target="_blank" rel="noopener noreferrer">
                <img className="linkedIn-icon icon" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" 
                    alt="LinkedIn">   
                </img>
            </a>
        </div>
    )
}