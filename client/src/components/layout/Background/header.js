

import React from 'react';

import './header.css';

const Background = () => {
    const videoSource = "https://res.cloudinary.com/aliciarojo/video/upload/v1607609138/samples/sea-turtle.mp4"
    return (
        <div className="colorBack">
            <video autoPlay="autoplay" loop="loop" muted className="Video" >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            
        </div>
    )
}

export default Background