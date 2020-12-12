import {Container, Row } from 'react-bootstrap'
import LocalCard from './local-card'
import React, { Component } from 'react'
import LocalService from '../../../service/local.service'


class Locals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locals: undefined,
            loggedUser:undefined
        }
        this.localService = new LocalService()
    }


    refreshLocals = () => {
        this.localService
            .getLocals()
            .then(res => {
                this.setState({ locals: res.data })
                if (this.props.loggedUser) {
                    this.setState({ loggedUser: this.props.loggedUser._id})
                }
                else {
                    
                }
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
                                {this.state.locals.map(elm => <LocalCard key={elm._id} {...elm} loggedUser={this.state.loggedUser}/>)}
                            </Row></>
                        :
                        <h1>cargando</h1>
                    }
                </Container>
            </>
        )
    }
}

export default Locals

