import React, { Component } from 'react'
import localService from '../../../service/local.service'
import { Form, Col, Row, Container, Button, FormLabel } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import './local-form.css'


class LocalForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            latitude: '',
            longitude: '',
            telephone: '',
            owner: this.props.loggedUser._id,
            closeHour: ["00", "00", "00", "00", "00", "00", "00"],
            openHour: ["00", "00", "00", "00", "00", "00", "00"]

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
                return (<Redirect to='/perfil' />)
            })
            .catch(err => console.log('Ha habido un error', err))
    }
    // startTimeChanged(a)=>{ 

    // this.setState({ this.state.closeHour: this.state.closeHour.push(a) })
    // }

    handleOpenTime = (time, index) => {
        let openHour = [...this.state.openHour]
        const hour = time.toString().slice(16, 18)
        openHour[index] =  hour 
        console.log(hour)

        this.setState({ openHour: openHour })
    }


    handleCloseTime = (time, index) => {
        let closeHour = [...this.state.closeHour]
        const hour = time.toString().slice(16, 18)
        closeHour[index] =  hour 

        this.setState({ closeHour: closeHour })
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

                                <Form.Group controlId="latitude">
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control type="text" name="latitude" value={this.state.latitude} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="longitude">
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control type="number" name="longitude" value={this.state.longitude} onChange={this.handleInputChange} />
                                </Form.Group>

                                {/* <Form.Group controlId="openhour">
                                    <Form.Label>Hora de apertura</Form.Label>
                                    <Form.Control type="String" name="openHour" value={this.state.openHour} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="openhour">
                                    <Form.Label>Hora de cierre</Form.Label>
                                    <Form.Control type="String" name="closeHour" value={this.state.closeHour} onChange={this.handleInputChange} />
                                </Form.Group> */}
                                <div className="center">
                                    <FormLabel >Horario</FormLabel>
                                </div>
                                <div className="forms">
                                    <label>Lunes</label>
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

                                        onChange={time => { this.handleOpenTime(time, 0) }}>
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

                                        onChange={time => { this.handleCloseTime(time, 0) }}>
                                        <input type='text' data-input />
                                        <Button type='button' data-toggle>Select</Button>
                                    </Flatpickr>
                                </div></div>
                                <div className="forms">
                                    <label>Martes</label>
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

                                            onChange={time => { this.handleOpenTime(time, 1) }}>
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

                                            onChange={time => { this.handleCloseTime(time, 1) }}>
                                            <input type='text' data-input />
                                            <Button type='button' data-toggle>Select</Button>
                                        </Flatpickr>
                                    </div>
                                </div>
                                <div className="forms">
                                  
                                    <label>Miercoles</label>
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

                                        onChange={time => { this.handleOpenTime(time, 2) }}>
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

                                        onChange={time => { this.handleCloseTime(time, 2) }}>
                                        <input type='text' data-input />
                                        <Button type='button' data-toggle>Select</Button>
                                    </Flatpickr>
                                    </div>
                                </div>
                                <div className="forms">

                                    <label>Jueves</label>
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

                                            onChange={time => { this.handleOpenTime(time, 3) }}>
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

                                            onChange={time => { this.handleCloseTime(time, 3) }}>
                                            <input type='text' data-input />
                                            <Button type='button' data-toggle>Select</Button>
                                        </Flatpickr>
                                    </div>
                                </div>
                                <div className="forms">

                                    <label>Viernes</label>
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

                                            onChange={time => { this.handleOpenTime(time, 4) }}>
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

                                            onChange={time => { this.handleCloseTime(time, 4) }}>
                                            <input type='text' data-input />
                                            <Button type='button' data-toggle>Select</Button>
                                        </Flatpickr>
                                    </div>
                                </div>
                                <div className="forms">

                                    <label>Sábado</label>
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

                                            onChange={time => { this.handleOpenTime(time, 5) }}>
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

                                            onChange={time => { this.handleCloseTime(time, 5) }}>
                                            <input type='text' data-input />
                                            <Button type='button' data-toggle>Select</Button>
                                        </Flatpickr>
                                    </div>
                                </div>
                                <div className="forms">

                                    <label>Domingo</label>
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

                                            onChange={time => { this.handleOpenTime(time, 6) }}>
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

                                            onChange={time => { this.handleCloseTime(time, 6) }}>
                                            <input type='text' data-input />
                                            <Button type='button' data-toggle>Select</Button>
                                        </Flatpickr>
                                    </div>
                                </div>
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
