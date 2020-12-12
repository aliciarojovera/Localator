import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'
import {Link} from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            telephone: ''
        }
        this.authService = new AuthService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/')
            })
            .catch(err => console.log('Ha habido un error', err))
    }


    render() {

        return (
            <>
                <Container>

                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <h1>Registro de usuario</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="telephone">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="number" name="telephone" value={this.state.telephone} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button variant="dark" type="submit">Registrarme</Button>
                            </Form>
                            <br/>
                            <Link to="/registro-local">¿Tienes un local? ¡Regístrate aquí!</Link>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Signup
