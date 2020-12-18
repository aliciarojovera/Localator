import React, { Component } from 'react'
import LocalsService from '../../../service/local.service'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import './Local-details.css'
import BookingSchedule from './booking/bookingSchedule'
import BookingService from '../../../service/booking.service'
import Map from "../Maps/Map"
import SubTitle from '../../layout/Home/SubTitle'
import SubTitle2 from '../../layout/Home/SubTitle2'
import Loader from '../../shared/Loader/Loader'



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
        const dayWeek = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sáb", "Dom"]
        return (
            <Container className="local-details center">
                {this.state.local && this.state.books
                    ?
                    <>
                        <br></br>
                        <h1 > <SubTitle text={this.state.local.name}></SubTitle></h1>
                        {this.state.local.owner === this.state.loggedUser._id ?
                            <>
                                <br></br><br></br>
                                <Link className="btn-retro" to={`/nueva-sala/${this.state.local._id}`}>Nueva sala</Link>
                                <div className="flexDates">
                                    <Button className="btn-retro" onClick={this.restDay}>Día anterior</Button>
                                    <h2 className="date"><SubTitle2 text={this.state.currentDate.slice(0, 10)}></SubTitle2></h2>
                                    <Button className="btn-retro" onClick={this.addDay}>Siguiente día</Button>
                                </div>

                                <Row>

                                    {this.state.local.room.map((elm) =>
                                        <Col key={elm._id}><SubTitle2 text={elm.name}></SubTitle2>
                                            <BookingSchedule room={elm._id} nameRoom={elm.name} nameLocal={this.state.local.name} local={this.state.local} currentDate={this.state.currentDate} loggedUser={this.props.loggedUser} books={this.state.books.filter(book => book.room === elm._id)} updateBooks={this.refreshBooks} storeUser={this.props.storeUser} />
                                            <br />

                                            <Link className="btn-retro " to={`/editar-sala/${elm._id}`}> Editar sala </Link>
                                            <br />

                                            <br />
                                            <br />
                                            <Link className="btn-retro" to={`/sala/${elm._id}`}> Ver sala </Link>

                                        </Col>

                                    )}
                                </Row>
                            </>

                            :

                            <>

                                <Row>
                                    <Col md={{ span: 6, offset: 1 }} >
                                        <SubTitle2 text="Teléfono"></SubTitle2>
                                        <p style={{color:"white"}}>{this.state.local.telephone}</p><br/>
                                        <SubTitle2 text="Horario"></SubTitle2>
                                        <div className="flex">

                                            <div>
                                                {this.state.local.schedule.openHour.map((elm, idx) => <p style={{ color: "white" }}>{dayWeek[idx]}  {elm}:00 -</p>)}</div>
                                            <div>
                                                {this.state.local.schedule.closeHour.map(elm => <p style={{ color: "white" }}>{elm}:00</p>)}</div>
                                        </div></Col>
                                    <Col md={5}>

                                        <Map local={this.state.local} zoom={20} />
                                    </Col>
                                </Row>
                                <>
                                    <div className="flexDates">
                                        {this.state.local.room.map((elm) =>

                                            <Card style={{ width: '18rem' }} className="room-card">
                                                <Card.Body>
                                                    <Card.Title>{elm.name}</Card.Title>
                                                    <Card.Img variant="top" src={elm.image} className="imageCard" />

                                                    <Link className="btnDetail" to={`/sala/${elm._id}`} >Ver detalles y reservar</Link>
                                                 <br/>
                                                    <br /><Card.Text>{elm.price}€/h</Card.Text>
                                                </Card.Body>
                                            </Card>

                                        )}</div></>

                                <hr />

                                <Button onClick={this.goBack} className="btn btn-dark btn-block btn-retro">Go Back</Button>


                            </>}
                    </>
                    :
                    <Loader />

                }

            </Container>
        )
    }
}


export default LocalDetails