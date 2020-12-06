
import { Button, Container, Row } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import LocalCard from '../locals/local-card'
import React, { Component } from 'react'
import LocalService from './../../../service/local.service'


class ProfileOwner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locals: undefined,
            owner: this.props.loggedUser._id
        }
        this.localService = new LocalService()
    }


    refreshLocals = () => {
        this.localService
            .getLocals()
            .then(res => {
                // Filtrado de locales
                let myLocals = res.data
                myLocals = myLocals.filter(elm => elm.owner === this.state.owner)

                // Asignación de locales
                this.setState({ locals: myLocals })

            })
            .catch(err => { console.log(err) })
    }
    componentDidMount = () => this.refreshLocals()


    render() {
        return (
            <>
                <h3>SOY OWNER PROFILE</h3>
                <Container>
                    <h1>Listado de locales</h1>
                    {this.state.locals ?
                        <>
                            <Link to="/nuevo-local"><Button>New Local</Button></Link>
                            <Row>
                                {this.state.locals.map(elm => <LocalCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)}
                            </Row></>
                        :
                        <h1>cargando</h1>
                    }
                </Container>
            </>
        )
    }
}

export default ProfileOwner

