import './LocalMarker.css'
import React from 'react'


const LocalMarker = ({ text, handleClick }) => {

    const [hovered, setHovered] = React.useState("")

    return (
        <>
            <div><img src='./music (2).png'
                alt={text}
                className="localMarkerPic"
                // onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}

            />
                <div className="localMarkerTitle">{text}</div>
                {hovered ? <div className="localHovered">La info del local</div> : null}
            </div>

        </>
    )
}

export default LocalMarker