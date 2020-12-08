import React, { Component } from 'react'
import localService from '../../../service/local.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'


class LocalForm extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            equipment: '',
            capacity: '',
            days: [''],
            reserva: '',
            local

        }
        this.localService = new localService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()
        this.localService
            .newRoom(this.state)
            .then(res => { console.log(res) })
            .catch(err => console.log('Ha habido un error', err))
    }

    onChange = e => {
        console.log([e.target])
        console.log([e.target.name])
        if ([e.target.checked]) {
            console.log()

        }
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        // const [startDate, setStartDate] = useState(
        //     setHours(setMinutes(new Date(), 30), 16)
        // );
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
                                <p>{this.local.id }</p>
                             
                            
                                <br>

                                </br>
                                <Button variant="dark" type="submit" >Crear local</Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default LocalForm
