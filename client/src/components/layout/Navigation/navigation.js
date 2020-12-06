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
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }
    render() {
        return (<>
            <Navbar bg="dark" variant="dark" expand="md" className="nav">

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
                    <Navbar.Brand as="span" href="/">Localator</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/">
                            <Nav.Link as="div">Inicio</Nav.Link>
                        </Link>
                        {this.props.loggedUser ?
                            <Nav.Link as="div" onClick={this.logout}>Cerrar sesión</Nav.Link>
                            :
                            <>
                                <Link to="/registro">
                                    <Nav.Link as="div">Registro</Nav.Link>
                                </Link>
                                <Link to="/inicio-sesion">
                                    <Nav.Link as="div">Inicio sesión</Nav.Link>
                                </Link>

                            </>
                        }
                        <Link to="/perfil">
                            <Nav.Link as="div">{this.props.loggedUser ? `Hola ${this.props.loggedUser.username}` : 'hola invitado'}</Nav.Link>
                        </Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>   <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" /></>
        )
    }
}
export default Navigation