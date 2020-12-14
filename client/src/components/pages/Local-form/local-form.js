import React, { Component } from 'react'
import localService from '../../../service/local.service'
import { Form, Col, Row, Container, Button, FormLabel } from 'react-bootstrap'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import './local-form.css'
import Autocomplete from '../Maps/Autocomplete'


class LocalForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            latitude: '',
            longitude: '',
            telephone: '',
            address: '',
            owner: this.props.loggedUser._id,
            closeHour: ["00", "00", "00", "00", "00", "00", "00"],
            openHour: ["00", "00", "00", "00", "00", "00", "00"],
            days: [ "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"], 

        }
        this.localService = new localService()

    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {

        e.preventDefault()
        this.localService
            .newLocal(this.state)
            .then(() => {
                console.log(this.props)
                this.props.history.push('/perfil')
            })
            .catch(err => console.log('Ha habido un error', err))
    }
  

    handleOpenTime = (time, index) => {
        let openHour = [...this.state.openHour]
        const hour = time.toString().slice(16, 18)
        openHour[index.idx] =  hour 

        this.setState({ openHour: openHour })
        console.log(this.state.openHour)
    }


    handleCloseTime = (time, index) => {
        let closeHour = [...this.state.closeHour]
        const hour = time.toString().slice(16, 18)
        closeHour[index.idx] =  hour 

        this.setState({ closeHour: closeHour })
    }

    // el padre coge el resultado del autocomplete
    latLngHandler = (latLng, address) => {
        this.setState({
            latitude: latLng.lat,
            longitude: latLng.lng,
            address: address
        })
    }

    render() {

        return (
            <>
                <Container>

                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <h1>Nuevo local</h1>
                            <hr />

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="name" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="telephone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="Text" name="telephone" value={this.state.telephone} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Dirección</Form.Label>
                                    <Autocomplete handler={this.latLngHandler}></Autocomplete>
                                </Form.Group>

                                <Form.Group controlId="latitude">
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control type="text" name="latitude" value={this.state.latitude} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="longitude">
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control type="number" name="longitude" value={this.state.longitude} onChange={this.handleInputChange} />
                                </Form.Group>

                                <div className="center">
                                    <FormLabel >Horario</FormLabel>
                                </div>

                                {this.state.days.map((elm, idx) => 
                                    <div key={idx} className="forms">
                                    <label>{elm}</label>
                                    <div className="hour">
                                    <Flatpickr className="Flatpickr"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:00",
                                            defaultDate: "00:00",
                                            time_24hr: true,
                                            minuteIncrement: 0
                                        }}

                                        onChange={time => { this.handleOpenTime(time, {idx}) }}>
                                        <input type='text' data-input />
                                        <Button type='button' data-toggle>Select</Button>
                                    </Flatpickr>

                                    <Flatpickr className="Flatpickr"
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:00",
                                            defaultDate: "00:00",
                                            time_24hr: true,
                                            minuteIncrement: 0
                                        }}

                                        onChange={time => { this.handleCloseTime(time, {idx}) }}>
                                        <input type='text' data-input />
                                        <Button type='button' data-toggle>Select</Button>
                                    </Flatpickr>
                                        </div></div>
                                )}
                              
                                <Button variant="dark" type="submit">Crear local</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}


export default LocalForm
