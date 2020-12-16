import React, { Component } from 'react'
import BookingService from './../../../../service/booking.service'
import EmailService from './../../../../service/email.service'

import { Form, Button } from 'react-bootstrap'




class BookingForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.owner,
            room: this.props.room,
            date: this.props.date,
            bookRoom: undefined,
            name: undefined ,
            chanceHours: undefined,
            numberHours: 1
        }
        this.bookingService = new BookingService()
        this.EmailService= new EmailService()
    }

    componentDidMount = () => {

        if (this.props.room) {
             this.setState({ bookRoom: this.props.room })
        }
        else {
              let rooms = this.props.rooms.filter(elm => elm._id === this.state.room)
        this.setState({ bookRoom: rooms })

        }
      
        this.getDate(this.state.date, this.props.books)
    }


    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = e => {
        e.preventDefault()
        let copyDate = this.state.date
        const numberHours = this.state.numberHours
        const room = this.state.room
        const owner = this.state.owner
        let name = ""
        const emailData = [this.props.nameRoom, this.state.date.getHours(), this.state.date.getDate(), this.state.date.getMonth() + 1 ,this.state.date.getFullYear(), this.props.loggedUser.members ]
        if (this.props.loggedUser._id === this.props.localOwner) {
            name=this.state.name
        }
        else {
            name=this.props.loggedUser.username
        }
        for (let i = 0; i < numberHours; i++) {
           
            let date = new Date(copyDate)
            this.bookingService
                .newBook({ room, owner, date, name })
                .then(res => {
                    this.props.storeUser(res.data)
                    this.props.updateBooks()
                    this.props.closeModal()
                    this.EmailService
                    .sendEmail(emailData)
                })
                
                .catch(err => console.log(err))
            copyDate = new Date(copyDate.setTime(copyDate.getTime() + (1 * 60 * 60 * 1000)))
        }
    }


    dayWeek = (date) => {
        if (date.getDay() === 0) {
            return 6
        } else {
            return date.getDay() - 1
        }
    }

    // comprueba si hay alguna reserva después de la que voy a hacer
    checkReh = (books, myHour, myDate) => {
        for (let i = 0; i < books.length; i++) {
            let bookHour = new Date(books[i].date).getHours()
            if (new Date(books[i].date).getDate() === new Date(myDate).getDate() && bookHour > myHour) {
                return bookHour - myHour
            } else {
            }
        }
    }

    //  horas que puedo ensayar
    getDate = (date, books) => {
        let myDate = date
        let myDay = this.dayWeek(date)
        let myHour = date.getHours()
        let todayClose = this.props.schedule.closeHour[myDay]
        let nextBook = this.checkReh(books, myHour, myDate)
        let chanceHours = null
        if (nextBook) {
            chanceHours = nextBook
        } else {
            chanceHours = todayClose - this.state.date.getHours()
        }
        this.setState({ chanceHours: chanceHours })
    }

    // Crea una opción por cada elemento de un array de horas disponibles
    pushOne = number => {
        return (
            <option key={number} value={number}>{number} horas </option>
        )
    }

    // Procedimiento que pinta todas las opciones en un array 
    createOptions = () => {
        let myResult = []
        for (let i = 1; i < this.state.chanceHours + 1; i++) {
            myResult.push(this.pushOne(i))
        }
        return myResult
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
                                <br />
                                <Form.Label>{this.props.nameRoom}</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="hours">
                                <Form.Label>Hora:</Form.Label>
                                <br />
                                <Form.Label>{this.state.date.getHours()}:00</Form.Label>

                                {/* =====> RESERVA <====== */}
                                <Form.Group>
                                    <Form.Label>¿Cuántas horas quieres reservar?:</Form.Label>
                                    <Form.Control as="select" name="numberHours" defaultValue="1" onChange={this.handleInputChange}>
                                        {this.createOptions()}
                                    </Form.Control>
                                </Form.Group>
                                {/* =====> RESERVA <====== */}

                            </Form.Group>
                            <Form.Group controlId="day">
                                <Form.Label>Día</Form.Label>
                                <br />
                                <Form.Label>{this.state.date.getDate()} / {this.state.date.getMonth() + 1} / {this.state.date.getFullYear()}</Form.Label>
                            </Form.Group>
                            {this.props.loggedUser._id===this.props.localOwner ? 
                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder=""/>
                                </Form.Group>
                            
                                :
                                <Form.Group controlId="name">
                                 <Form.Label>Nombre: </Form.Label><br/>
                            <Form.Label>{this.props.loggedUser.username}</Form.Label>
                                  </Form.Group>

                            }

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