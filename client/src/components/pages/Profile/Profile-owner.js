
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import LocalCard from '../Locals/local-card'
import LocalService from './../../../service/local.service'
import './Profile-owner.css'


class ProfileOwner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedUser:undefined,
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
    componentDidMount = () => {
        this.setState({ loggedUser: this.props.loggedUser._id })
        this.refreshLocals()
    }


    render() {
        return (
            <>
                
                <Container className="profileOwner">
                    <h1>Tus locales</h1>
                    {this.state.locals ?
                        <>
                            <Link to="/nuevo-local"><Button className="btn btn-dark btn-sm btn-new">Nuevo local</Button></Link>
                            <Row>
                                {this.state.locals.map(elm => <LocalCard key={elm._id} {...elm} loggedUser={this.props.loggedUser._id} />)}
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

