import React, { Component } from 'react'
import localService from '../../../service/local.service'
import TimePicker from 'react-time-picker';

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class LocalForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            latitude: '',
            longitude: '',
            telephone: '',
            owner: this.props.loggedUser._id,
            operHour: '',
            closeHour: ''

        }
        this.localService = new localService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()
        this.localService
            .newLocal(this.state)
            .then(res => { console.log(res) })
            .catch(err => console.log('Ha habido un error', err))
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
                                <Form.Group controlId="openhour">
                                    <Form.Label>Hora de apertura</Form.Label>
                                    <Form.Control type="String" name="openHour" value={this.state.openHour} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="openhour">
                                    <Form.Label>Hora de cierre</Form.Label>
                                    <Form.Control type="String" name="closeHour" value={this.state.closeHour} onChange={this.handleInputChange} />
                                </Form.Group>
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
