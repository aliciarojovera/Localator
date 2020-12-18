
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import LocalCard from '../Locals/Local-card'
import LocalService from './../../../service/local.service'
import './Profile-owner.css'
import SubTitle from '../../layout/Home/SubTitle'
import Loader from '../../layout/Loader/Loader'

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
                    <h1><SubTitle text="Tus locales"></SubTitle></h1>
                    {this.state.locals ?
                        <>
                            <br/>
                            <Link to="/nuevo-local"><Button className="btn-retro2">Nuevo local</Button></Link>
                            <br/><br/>
                            <Row>
                                {this.state.locals.map(elm => <LocalCard key={elm._id} {...elm} loggedUser={this.props.loggedUser._id} />)}
                            </Row></>
                        :
                        <Loader></Loader>
                    }
                </Container>
            </>
        )
    }
}

export default ProfileOwner

