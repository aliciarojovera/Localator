import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'
import {Link} from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SubTitle from '../../layout/Home/SubTitle'
import SubTitle2 from '../../layout/Home/SubTitle2'

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
            <div id="kc-container" className="generaldiv">
                <Container>

                    <Row>
                        <Col md={{ span: 5, offset: 0 }}>
                            <br/>

                            <SubTitle text="Registro de usuario"></SubTitle>
                            <Link to="/registro-local" className="signup-label">¿Tienes un local? ¡Regístrate aquí!</Link>

                        </Col>
                        <Col md={{ span: 6, offset: 0}}>

                            <div className="formBack">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label className="label"><SubTitle2 text="Usuario"></SubTitle2></Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                        <Form.Label className="label"><SubTitle2 text="Contraseña"></SubTitle2></Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                        <Form.Label className="label"><SubTitle2 text="E-mail"></SubTitle2></Form.Label>
                                    <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="telephone">
                                        <Form.Label className="label"><SubTitle2 text="Teléfono"></SubTitle2></Form.Label>
                                    <Form.Control type="number" name="telephone" value={this.state.telephone} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Button variant="dark" className="btn-reg" type="submit">Registrarme</Button>
                            </Form></div>
                            <br/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Signup
