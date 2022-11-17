import React, {useState, useEffect} from 'react'

export function Slider(props) {
    const [value, setValue] = useState(100)

    function adjustSlider(event) {
        setValue(event.target.valueAsNumber)
        sliderValue(value)
    }

    function getBackgroundSize() {
        return {backgroundSize: `${(value * 100) / 10} % 100`}
    }

    return (
        value,
        <div className="slidecontainer">
            <div className='slider-text'>Speed: {`${value}`}</div>
            <input className="slider speed-slider"
                disabled={props.algoOn}
                type='range'
                min={1}
                max={1000}
                onChange={(event) => adjustSlider(event)}
                value={value}
                style={getBackgroundSize()}
                aria-label="Small"
                ></input>
        </div>
    )
}

export function sliderValue(value) {
    return value
}