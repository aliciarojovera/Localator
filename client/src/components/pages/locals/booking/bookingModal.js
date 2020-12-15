import React, { Component } from 'react'
import BookingService from './../../../../service/booking.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'



class BookingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.owner,
            room: this.props.room,
            date: this.props.date,
            bookRoom: undefined,
            name:undefined


        }
        this.bookingService = new BookingService()
    }

    componentDidMount = () => {

        let rooms = this.props.rooms.filter(elm => elm._id === this.state.room)
        this.setState({ bookRoom:rooms})

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {
        e.preventDefault()

        const date = this.state.date
        const room = this.state.room
        const owner = this.state.owner
        const name = this.state.name
        this.bookingService
            .newBook({ room, owner, date, name })
            .then(res => {
                this.props.storeUser(res.data)
            
                this.props.updateBooks()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }



    render() {

        return (
            <>
                {this.state.bookRoom ?
                    <>
                        <h1>Nueva reserva</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="room">
                                <Form.Label>Sala:</Form.Label>
                                <br/>
                                <Form.Label>{this.state.bookRoom[0].name}</Form.Label> 
                            </Form.Group>
                            <Form.Group controlId="hours">
                                <Form.Label>Hora:</Form.Label>
                                <br/>
                                <Form.Label>{this.state.date.getHours()}:00</Form.Label>
                               
                            </Form.Group>
                            <Form.Group controlId="day">
                                <Form.Label>Día</Form.Label>
                                <br/>
                                <Form.Label>{this.state.date.getDate()} / {this.state.date.getMonth() + 1} / { this.state.date.getFullYear()}</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>
                         
                            <Button variant="dark" type="submit">Confirmar reserva</Button>
                        </Form>
                    </>
                    :
                    <h1>cargando</h1>

                }
            </>
        )
    }
}


export default BookingForm