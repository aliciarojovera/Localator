import React, { Component } from 'react'
import LocalsService from './../../../service/local.service'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Table from './schedule'
import './local-details.css'

class LocalDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            local: undefined,
            loggedUser: undefined,
            rooms: undefined,
            date: '',
            dayWeek: '',
            counter:1
        }
        this.localsService = new LocalsService()
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount = () => {
        const local_id = this.props.match.params.local_id

        if (this.props.loggedUser) {
            this.setState({ loggedUser: this.props.loggedUser })
        } else {
            this.setState({ loggedUser: "null" })
        }

        if (local_id) {
            

            this.localsService
                .getLocal(local_id)
                .then(res => {console.log(local_id)
                    //asignación de toda la info necesaria para la reserva
                    this.setState({ local: res.data })
                    this.setState({ rooms: res.data.room })
                    let a = new Date()
                    a = a.toString()
                    let day = a.slice(4, 10)
                    this.setState({ date: day })
                    let dayWeek = a.slice(0, 3)
                    this.setState({ dayWeek: dayWeek })
                    console.log(res.data)
                    // this.localsService
                    //     .getRooms(this.state.rooms)
                    //     //reasignación del las rooms 
                    //     .then(res => {
                    //         this.setState({ rooms: res.data })

                    //     })
                    //     .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }
    goBack() {
        this.props.history.goBack();
    }

    addDay=()=>{

        var date = new Date()
        var days= this.state.counter
    
        date.setDate(date.getDate() + days)

        days = days + 1
        this.setState({ counter: days })
        date = date.toString()
        let day = date.slice(4, 10)
        this.setState({ date: day })
        let dayWeek = date.slice(0, 3)
        this.setState({ dayWeek: dayWeek })


    }

    restDay = () => {
        var date = new Date()
        var days = this.state.counter

        days = days - 1
        date.setDate(date.getDate() + days)
        this.setState({ counter: days })
        date = date.toString()
        let day = date.slice(4, 10)
        this.setState({ date: day })
        let dayWeek = date.slice(0, 3)
        this.setState({ dayWeek: dayWeek })
    }


    render() {

        return (
            <Container className="local-details">
                {this.state.local && this.state.rooms
                    ?
                    <>

                        <h1> {this.state.local.name}</h1>
                        {this.state.local.owner === this.state.loggedUser._id ?
                            <>
                                <Link to={`/nueva-sala/${this.state.local._id}`}>Nueva sala</Link>
                                <div className="flexDates">
                                    <Button onClick={this.restDay}>Día anterior</Button>
                                    <h2 className="date">{this.state.date}</h2>
                                <Button onClick={this.addDay}>Siguiente día</Button>
                                </div> 
                                <>
                                    <Row>

                                        <Table room={this.state.rooms} local={this.state.local} date={this.state.date} dayWeek={this.state.dayWeek}  loggedUser={this.state.loggedUser}></Table>

                                    </Row> </>

                            </>
                            :

                            <>

                                <Row>
                                    <Col md={{ span: 6, offset: 1 }} >
                                    </Col>
                                    <Col md={3}>
                                        <h3>Teléfono</h3>
                                        <p>{this.state.local.name}</p>

                                        <div className="mapDetail" >{this.state.local.location.coordinates}</div>
                                        <hr />
                                        <Button onClick={this.goBack} className="btn btn-dark btn-block btn-sm">Go Back</Button>

                                    </Col>
                                </Row></>}
                    </>
                    :
                    <h1>Cargando</h1>
                }

            </Container>
        )
    }
}

export default LocalDetails