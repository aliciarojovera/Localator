import React, { Component } from 'react'
import BookingService from './../../../../service/booking.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'



class BookingForm extends Component {

            constructor() {
                super()
                this.state = {
                    invited: '',
                    hour: '',
                    day: '',
               
                }
                this.bookingService = new BookingService()
            }

            handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

            handleSubmit = e => {
                e.preventDefault()

                this.bookingService
                    .saveBook(this.state)
                    .then(res => {
                        this.props.updateList()
                        this.props.closeModal()
                    })
                    .catch(err => console.log(err))
            }



            render() {

                return (
                    <>
                        <h1>Nueva reserva</h1>
                        <hr />

                    
                    </>
                )
            }
        }


export default BookingForm