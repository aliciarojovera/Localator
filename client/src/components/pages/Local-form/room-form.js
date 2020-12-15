import React, { Component } from 'react'
import localService from '../../../service/local.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


class LocalForm extends Component {

    constructor(props) {

        super(props)

        this.state = {
            name: '',
            equipment: '',
            capacity: '',
            days: [''],
            schedule: '',
            local: '',
            image: '',
            price: ''

        }
        this.localService = new localService()

    }

    handleInputChange = e => {
        const local_id = this.props.match.params.localId
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ local: local_id })
    }

    handleSubmit = e => {

        e.preventDefault()


        this.localService
            .newRoom(this.state)
            .then(res => {
                console.log(res)
                this.props.history.push(`/local/${this.state.local}`)

            })
            .catch(err => console.log('Ha habido un error', err))

    }


    render() {

        return (
            <>
                <Container>

                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <h1>Nueva sala</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="equipment">
                                    <Form.Label>Equipo</Form.Label>
                                    <Form.Control type="Text" name="equipment" value={this.state.equipment} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="capacity">
                                    <Form.Label>Capacity</Form.Label>
                                    <Form.Control type="number" name="capacity" value={this.state.capacity} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="image">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Precio por hora</Form.Label>
                                    <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
                                </Form.Group>

                                <br>

                                </br>
                                <Button variant="dark" type="submit" >Crear sala</Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default LocalForm
