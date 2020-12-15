import React, { Component } from 'react'
import LocalsService from './../../../service/local.service'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './local-details.css'
import BookingSchedule from './booking/bookingSchedule'
import BookingService from './../../../service/booking.service'
import Map from "../Maps/Map"


class LocalDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            local: undefined,
            loggedUser: this.props.loggedUser || "",
            rooms: undefined,
            books: undefined,
            counter: 1,
            currentDate: undefined,
        }
        this.localsService = new LocalsService()
        this.goBack = this.goBack.bind(this)
        this.bookingService = new BookingService()
    }


    componentDidMount = () => {
        const local_id = this.props.match.params.local_id

        if (local_id) {

            this.localsService
                .getLocal(local_id)
                .then(res => {
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

    addDay = e => {
        e.preventDefault()
        let date = new Date(this.state.currentDate)
        date.setDate(date.getDate() + 1)
        date = date.toString()
        this.setState({ currentDate: date })
    }

    findBooks = () => {
        this.bookingService
            .getBooks(this.state.rooms)
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err))

    }
    refreshBooks = () => {

        this.bookingService
            .getBooks(this.state.rooms)
            .then(res => this.setState({ books: res.data }))
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
const dayWeek = ["Lun", "Mar","Mie", "Jue", "Vie", "Sáb", "Dom"]
        return (
            <Container className="local-details center">
                {this.state.local && this.state.books
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
                                                <BookingSchedule room={elm._id} local={this.state.local} currentDate={this.state.currentDate} loggedUser={this.props.loggedUser} books={this.state.books.filter(book => book.room === elm._id)} updateBooks={this.refreshBooks} storeUser={this.props.storeUser} />

                                            </Col>

                                        )}
                                    </Row> </>
                            </>

                            :

                            <>

                                <Row>
                                    <Col md={{ span: 6, offset: 1 }} >
                                       
                                        {/* <h3>Horario</h3>
                                        <div className="flex">
                                            
                                            <div>
                                                {this.state.local.schedule.openHour.map((elm, idx) => <p>{dayWeek[idx]}  {elm}:00 -</p>)}</div>
                                            <div>
                                            {this.state.local.schedule.closeHour.map(elm => <p>{elm}:00</p>)}</div>
                                        </div> */}
                                        {this.state.local.room.map((elm) =>
                                            <Row>
                                            <Col key={elm._id}>{elm.name} 
                                                <BookingSchedule room={elm._id} local={this.state.local} currentDate={this.state.currentDate} loggedUser={this.props.loggedUser} books={this.state.books.filter(book => book.room === elm._id)} updateBooks={this.refreshBooks} storeUser={this.props.storeUser} />

                                            </Col></Row>

                                        )}
                                        <hr />

                                        <Button onClick={this.goBack} className="btn btn-dark btn-block btn-sm">Go Back</Button>

                                    </Col>
                                    <Col md={5}>

                                        <Map local={this.state.local} />
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