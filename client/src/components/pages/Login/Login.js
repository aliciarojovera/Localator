import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'
import './Login.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SubTitle from '../../layout/Home/SubTitle'
import SubTitle2 from '../../layout/Home/SubTitle2'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/')
            })
            .catch(err => console.log({ err }))
    }


    render() {

        return (

            <div id="kc-container" className="generaldiv">
                <Container><Row>

                    <Col>
                      <br/>
                        <h2 className="title"><SubTitle text="Inicia sesión"></SubTitle></h2>
                        <div className="formBack">
                            <Form onSubmit={this.handleSubmit} className="kc-form-horizontal">
                                <Form.Group controlId="username" >
                                    <Form.Label className="label"><SubTitle2 text="Usuario"></SubTitle2></Form.Label>
                                    <Form.Control type="text" name="username" className="form-control" id="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label className="label"><SubTitle2 text="Contraseña"></SubTitle2></Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <button className="btn-log " type="submit">Iniciar sesión</button>
                            </Form>
                        </div>
                    </Col>

                </Row>
                </Container>  </div>

        )
    }
}

export default Login