import {Container, Row } from 'react-bootstrap'
import LocalCard from './local-card'
import React, { Component } from 'react'
import LocalService from '../../../service/local.service'


class ProfileOwner extends Component {

    constructor() {
        super()
        this.state = {
            locals: undefined,
        }
        this.localService = new LocalService()
    }


    refreshLocals = () => {
        this.localService
            .getLocals()
            .then(res => {
               
                this.setState({ locals: res.data })

            })
            .catch(err => { console.log(err) })
    }
    componentDidMount = () => this.refreshLocals()


    render() {
        return (
            <>
                <Container>
                    <h1>Listado de locales</h1>
                    {this.state.locals ?
                        <>
                            <Row>
                                {this.state.locals.map(elm => <LocalCard key={elm._id} {...elm} />)}
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

