import React, { Component } from 'react'
import localService from '../../../service/local.service'
import { Form, Col, Row, Container, Button, FormLabel } from 'react-bootstrap'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import './Local-form.css'
import Autocomplete from '../Maps/Autocomplete'
import SubTitle from '../../layout/Home/SubTitle'
import SubTitle2 from '../../layout/Home/SubTitle2'


class LocalForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id:'',
            name: '',
            latitude: '',
            longitude: '',
            address: '',
            telephone: '',
            closeHour: ["00", "00", "00", "00", "00", "00", "00"],
            openHour: ["00", "00", "00", "00", "00", "00", "00"],
            days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            rooms: ''
        }
        this.localService = new localService()

    }

    componentDidMount = () => {
        const localId = this.props.match.params.local_id
        this.setState({ id: localId })
        this.localService
            .getLocal(localId)
            .then(res => {
                this.setState({ name: res.data.name, rooms: res.data.room, latitude: res.data.location.coordinates[0], longitude: res.data.location.coordinates[1], address:res.data.address, openHour: res.data.schedule.openHour, closeHour: res.data.schedule.closeHour, telephone: res.data.telephone })
            })
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })




    handleSubmit = e => {

        e.preventDefault()
        console.log(this.props)
        this.localService
            .editLocal(this.state)
            .then(() => {
                console.log(this.props)
                this.props.history.push('/perfil')     
            })
            .catch(err => console.log('Ha habido un error', err))
    }

    handleOpenTime = (time, index) => {
        let openHour = [...this.state.openHour]
        const hour = time.toString().slice(16, 18)
        openHour[index.idx] = hour

        this.setState({ openHour: openHour })
        console.log(this.state.openHour)
    }


    handleCloseTime = (time, index) => {
        let closeHour = [...this.state.closeHour]
        const hour = time.toString().slice(16, 18)
        closeHour[index.idx] = hour

        this.setState({ closeHour: closeHour })
    }

//  el padre coge el resultado del autocomplete
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
                            <br></br>
                            <h1><SubTitle text="Editar local"/></h1>
                            <hr />

                            <Form onSubmit={this.handleSubmit}>
                                
                                
                                <Form.Group controlId="username">
                                    <Form.Label><SubTitle2 text="Nombre" /></Form.Label>
                                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="telephone">
                                    <Form.Label><SubTitle2 text="Teléfono" /></Form.Label>
                                    <Form.Control type="Text" name="telephone" value={this.state.telephone} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label><SubTitle2 text="Dirección" /></Form.Label>
                                    <Autocomplete handler={this.latLngHandler} default={this.state.address}></Autocomplete>
                                </Form.Group>

                                <Form.Group controlId="latitude">
                                    <Form.Control type="text" name="latitude" className="displayNone" value={this.state.latitude} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="longitude">
                                    <Form.Control type="number" name="longitude " className="displayNone" value={this.state.longitude} onChange={this.handleInputChange} />
                                </Form.Group>

                                <div className="center">
                                    <FormLabel  ><SubTitle2 text="Horario" /></FormLabel>
                                </div>

                                {this.state.days.map((elm, idx) =>
                                    <div className="forms" key={idx}>
                                        <label style={{color:"white"}}>{elm}</label>
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
                                            value={this.state.openHour[idx]}
                                                onChange={time => { this.handleOpenTime(time, { idx }) }}>
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
                                                value={this.state.closeHour[idx]}

                                                onChange={time => { this.handleCloseTime(time, { idx }) }}>
                                                <input type='text' data-input />
                                                <Button type='button' data-toggle>Select</Button>
                                            </Flatpickr>
                                        </div></div>
                                )}
                                <br/>
                                <Button className="btn-retro" type="submit">Editar local</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default LocalForm
