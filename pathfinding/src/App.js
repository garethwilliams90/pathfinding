import React, {useState} from 'react'
import Visualiser from './Visualiser'
import SocialIcons from './socialIcons'


export default function App() {
    const [sliderValue, setSliderValue] = useState(50)
    const [theme, setTheme] = useState('dark')

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
            <div className='top-bar'>
                <SocialIcons />
                <button className="theme" onClick={toggleTheme}>Toggle Theme</button>
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