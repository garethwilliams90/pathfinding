import React, {useState} from 'react'
import Visualiser from './Visualiser'
import SocialIcons from './socialIcons'
import Instructions from './instructions'


export default function App() {
    const [sliderValue, setSliderValue] = useState(50)
    const [theme, setTheme] = useState('dark')
    const [instructions, setInstructions] = useState(false)

    function toggleInstructions() {
        setInstructions(prevState => !prevState)
    }

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        console.log(theme)
    }

    function adjustSlider(event) {
        setSliderValue(event.target.valueAsNumber)
        sliderValue(sliderValue)
    }

    function getBackgroundSize() {
        return {backgroundSize: `${(sliderValue * 100) / 10} % 100`}
    }

    return (
        <div>
            <Instructions
                    instructions={instructions}
                />
            <div className='top-bar'>
                <SocialIcons />
                <button
                    className='button instructions'
                    onClick={toggleInstructions}
                    >Instructions
                </button>
                
                <div className='title'>
                    <div className="pathfinding-vis">Pathfinding Visualiser</div>
                    <div className='by-gareth'>Code Written By Gareth Williams, 2022</div>
                </div>
                {/* <button className="theme" onClick={toggleTheme}>Toggle Theme</button> */}
                <div className="slidecontainer">                 
                    <div className='slider-text'>{`${sliderValue} ms`}</div>
                    <input className="slider speed-slider"   
                        type='range'
                        min={1}
                        max={500}
                        onChange={(event) => adjustSlider(event)}
                        sliderValue={sliderValue}
                        style={getBackgroundSize()}
                        aria-label="Small"
                        ></input>
                </div> 
            </div>
            <Visualiser
                sliderValue={sliderValue}
                theme={theme}
            />
        </div>
    )
}