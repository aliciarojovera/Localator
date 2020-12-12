import React, { Component } from 'react'
import LocalsService from './../../../service/local.service'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './local-details.css'
import BookingSchedule from './booking/bookingSchedule'
import BookingService from './../../../service/booking.service'
class LocalDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            local: undefined,
            loggedUser: this.props.loggedUser,
            rooms: undefined,

            counter: 1,
            currentDate: undefined
        }
        this.localsService = new LocalsService()
        this.goBack = this.goBack.bind(this)
        this.bookingService = new BookingService()
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
                .then(res => {
                    //asignación de toda la info necesaria para la reserva
                    let today = new Date()
                    today = today.toString()
                    this.setState({ local: res.data, rooms: res.data.room, currentDate: today }, () => this.findBooks())

                })
                .catch(err => console.log(err))
        }





    }


    goBack() {
        this.props.history.goBack();
    }

    timeout
    addDay = e => {
        e.preventDefault()
        let date = new Date(this.state.currentDate)
        date.setDate(date.getDate() + 1)
        date = date.toString()
        this.setState({ currentDate: date })
    }

    findBooks() {
      console.log(this.state.rooms)
        this.bookingService
                .getBooks(this.state.rooms)
                .then(res => console.log(res))
                .catch(err => console.log(err))
      
    }


    restDay = e => {
        e.preventDefault()
        let date = new Date(this.state.currentDate)

        date.setDate(date.getDate() - 1)
        date = date.toString()
        this.setState({ currentDate: date })
    }


    render() {

        return (
            <Container className="local-details center">
                {this.state.local && this.state.rooms
                    ?
                    <>

                        <h1 > {this.state.local.name}</h1>
                        {this.state.local.owner === this.state.loggedUser._id ?
                            <>
                                <Link className="btn btn-dark btn-sm " to={`/nueva-sala/${this.state.local._id}`}>Nueva sala</Link>
                                <div className="flexDates">
                                    <Button className="btn btn-dark new-room" onClick={this.restDay}>Día anterior</Button>
                                    <h2 className="date">{this.state.currentDate.slice(0, 10)}</h2>
                                    <Button className="btn btn-dark" onClick={this.addDay}>Siguiente día</Button>
                                </div>
                                <>
                                    <Row>

                                        {this.state.local.room.map((elm) =>
                                            <Col key={elm._id}>{elm.name}
                                                <BookingSchedule sala={elm._id} local={this.state.local} currentDate={this.state.currentDate} loggedUser={this.props.loggedUser} />

                                            </Col>

                                        )}
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