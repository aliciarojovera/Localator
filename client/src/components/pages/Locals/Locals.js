import { Container, Row } from 'react-bootstrap'
import LocalCard from './Local-card'
import React, { Component } from 'react'
import LocalService from '../../../service/local.service'
import Map from '../Maps/Map'
import SubTitle from '../../layout/Home/SubTitle'
import './Locals.css'
import Loader from '../../layout/Loader/Loader'

class Locals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locals: undefined,
            loggedUser: undefined
        }
        this.localService = new LocalService()
    }


    refreshLocals = () => {
        this.localService
            .getLocals()
            .then(res => {
                this.setState({ locals: res.data })
                if (this.props.loggedUser) {
                    this.setState({ loggedUser: this.props.loggedUser._id })
                }
            })
            .catch(err => { console.log(err) })
    }
    componentDidMount = () => this.refreshLocals()


    render() {
        return (
            <>
                <Map locals={this.state.locals} />
                <Container><br/>
                    <SubTitle className="listTitle" text="Listado de locales"></SubTitle>
                    {this.state.locals ?
                        <>
                            <Row className="locals">
                                
                                {this.state.locals.map(elm => <LocalCard key={elm._id} {...elm} loggedUser={this.state.loggedUser} />)}
                            </Row></>
                        :
                        <Loader/>
                    }
                </Container>
            </>
        )
    }
}

export default Locals

