import React, { Component } from 'react'
import BookingService from '../../../../service/booking.service'
import BookingSchedule from './../booking/bookingSchedule'
import LocalService from '../../../../service/local.service'
import './Room-details.css'
import { Col, Button, Row } from 'react-bootstrap'



class RoomDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            room: undefined,
            date: undefined,
            name: undefined,
            currentDate: undefined,
            books: undefined,
            local: undefined

        }
        this.bookingService = new BookingService()
        this.goBack = this.goBack.bind(this)
        this.localService = new LocalService()
    }

    componentDidMount = () => {
        let today = new Date()
        today = today.toString()
        this.localService
            .getRooms(this.props.match.params)
            .then(res => {
                this.setState({room:res.data[0], books:res.data[0].reservation, local:res.data[0].local, currentDate:today})

            })
        .catch(err=>console.log(err))

    }

    goBack() {
        this.props.history.goBack();
    }

    findLocal = () => {
        this.localService
            .getLocal(this.state.room.local)
            .then(res => {
                this.setState({ local: res.data })
            
            })
            .catch(err => console.log(err))

    }
    findBooks=()=>{
    this.bookingService
        .getBooks(this.props.match.params)
        .then(res => {
            let today = new Date()
            today = today.toString()
            this.setState({ currentDate: today, books: res.data }, () => this.findLocal())

        })
            .catch(err => console.log(err))

    }

    addDay = e => {
        e.preventDefault()
        let date = new Date(this.state.currentDate)
        date.setDate(date.getDate() + 1)
        date = date.toString()
        this.setState({ currentDate: date })
    }

    restDay = e => {
        e.preventDefault()
        let date = new Date(this.state.currentDate)
        date.setDate(date.getDate() - 1)
        date = date.toString()
        this.setState({ currentDate: date })
    }
    refreshBooks = () => {

        this.bookingService
            .getBooks(this.props.match.params)
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err))

    }

    render() {

        return (
            this.state.local ? 
                <>
                    
                    <Row>
                        <Col md={{ span: 5, offset: 1}}>
                    <h1>{this.state.room.name}</h1>
                    <img className="imgDetails" src={this.state.room.image} alt="Imagen del local"></img>
                            <h3>Equipo</h3>
                            <ul>
                            {this.state.room.equipment.map(elm=>
                                <li>{elm}</li>

                            )}</ul>
                    </Col>



                    <Col md={{ span: 4, offset: 1 }}>
                    <div className="flexDates">
                        <Button className="btn btn-dark roomBtn" onClick={this.restDay}>Día anterior</Button>
                        <h2 className="date">{this.state.currentDate.slice(0, 10)}</h2>
                        <Button className="btn btn-dark roomBtn" onClick={this.addDay}>Siguiente día</Button>
                    </div>

                   
                        
                            <BookingSchedule room={this.state.room._id} nameRoom={this.state.room.name } local={this.state.local} currentDate={this.state.currentDate} loggedUser={this.props.loggedUser} books={this.state.books} updateBooks={this.refreshBooks} storeUser={this.props.storeUser} />

                        </Col> 

                    
                </Row></>
                :
                <h1>cargando</h1>

                
                
        )
    }
}
export default RoomDetails
