import { Component } from 'react'
import './bookingSchedule.css'
import BookingService from '../../../../service/booking.service'
import BookingModal from './bookingModal'
import { Container, Row, Button, Modal } from 'react-bootstrap'


class BookingSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            local: this.props.local,
            currentDate: undefined,
            bookingHours: [],
            bookDate: undefined,
            bookRoom: undefined,
            loggedUser: undefined,
            books: undefined,
            showModal: false

        }
        this.bookingService = new BookingService()

    }

    componentDidMount = () => {
        this.setState({ currentDate: new Date(this.props.currentDate), loggedUser: this.props.loggedUser, books: this.props.books }, () => this.getBookingHours())

    }


    componentWillReceiveProps = (newprops) => {
        this.setState({ currentDate: new Date(newprops.currentDate), books:newprops.books }, () => this.getBookingHours())

    }

    getBookingHours = () => {
        let idxDayWeek = this.state.currentDate.getDay()
        const bookingHours = []

        if (idxDayWeek === 0) {
            for (let i = parseInt(this.state.local.schedule.openHour[6]); i < parseInt(this.state.local.schedule.closeHour[6]); i++) {

                bookingHours.push(new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate(), i, 0))

            }
        }
        else {
            for (let i = parseInt(this.state.local.schedule.openHour[idxDayWeek - 1]); i < parseInt(this.state.local.schedule.closeHour[idxDayWeek - 1]); i++) {

                bookingHours.push(new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate(), i, 0))

            }
        }
        this.setState({ bookingHours: bookingHours })


    }



    isRed = (elm, room) => {
        for (let i = 0; i < this.state.books.length; i++) {
            let goodDate = new Date(this.state.books[i].date)
            if (goodDate.toString() === elm.toString() ) {
                return true
            }
        }
    }

    handleModal = (visible, elm) => this.setState({ showModal: visible, bookDate: elm})


    render() {


        return (
            this.state.bookingHours && this.state.books

                ?
                <>
                    {this.state.bookingHours.map((elm, idx) =>
                        <>
                            {/* <div onClick={() => this.newBook(elm)} className={this.isRed(elm, this.props.room) ? "hoursRed" : "hours"} key={idx}> <p>{elm.getHours()}</p></div> */}
                            <div onClick={() => this.handleModal(true, elm)} className={this.isRed(elm, this.props.room) ? "hoursRed" : "hours"} > <p>{elm.getHours()}</p></div>

                            
                            <Modal className=" Modal" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                <Modal.Body>
                                    <BookingModal closeModal={() => this.handleModal(false)} date={this.state.bookDate} room={this.props.room} owner={this.props.loggedUser._id} updateBooks={this.props.updateBooks} rooms={this.state.local.room} storeUser={this.props.storeUser} />
                                </Modal.Body>
                            </Modal>
                        </>
                    )}
                </>
                : null
        )
    }




}


export default BookingSchedule