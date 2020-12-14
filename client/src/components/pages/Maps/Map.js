import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocalMarker from './LocalMarker'

class Map extends Component {
    constructor() {
        super()
        this.state = {
            center: {
                lat: 40.42380022443293,
                lng: -3.7113449216902583
            },
            zoom: 12,
        }
    }

    handleClick = elm => {
        console.log('Soy handleClick:', elm)
        this.setState({
            center: {
                lat: elm.location.coordinates[0],
                lng: elm.location.coordinates[1]
            },
            zoom: 16
        })
    }

    render() {

        return (

            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                >
                    {this.props.locals ?
                        this.props.locals.map((elm, idx) => <LocalMarker
                            lat={elm.location.coordinates[0]}
                            lng={elm.location.coordinates[1]}
                            text={elm.name}
                            key={idx}
                            handleClick={() => this.handleClick(elm)}
                        />)
                        :
                        null}
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map