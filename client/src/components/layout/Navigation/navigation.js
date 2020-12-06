import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'

import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './cable-jack.png'
import './navigation.css'

class Navigation extends Component {

    constructor() {
        super()
    this.authService = new AuthService()
    }

    logout = () => {
        console.log('ENTRANDO EN LOGOUT')
        this.authService
            .logout()
            .then(res => {
                this.props.storeUser(undefined)
                this.props.history.push('/')     

                console.log('RES DE LOGOOUT: ', res)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md" className="nav">
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" />
                <Link to="/">
                    <Navbar.Brand >
                        <img
                            alt="Logo"
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top logo"
                        />{' '}</Navbar.Brand>
                </Link>
                <Link to="/">
                    <Navbar.Brand href="/">Localator</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/">
                            <Nav.Link as="div">Inicio</Nav.Link>
                        </Link>
                        <Link to="/registro">
                            <Nav.Link as="div">Registro</Nav.Link>
                        </Link>
                        <Link to="/inicio-sesion">
                            <Nav.Link as="div">Inicio sesión</Nav.Link>
                        </Link>
                            <Nav.Link as="div" onClick ={this.logout}>Cerrar sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Navigation