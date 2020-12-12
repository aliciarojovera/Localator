

import React from 'react';

import './header.css';

const Background = () => {
    const videoSource = "https://media.istockphoto.com/videos/musician-playing-drums-close-up-rock-music-band-performing-at-concert-video-id1195516665"
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