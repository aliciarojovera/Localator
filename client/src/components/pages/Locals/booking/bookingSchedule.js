import { Component } from 'react'
import './bookingSchedule.css'
import BookingService from '../../../../service/booking.service'
import BookingModal from './bookingModal'
import { Container, Modal } from 'react-bootstrap'
import SubTitle from '../../../layout/Home/SubTitle'


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
            showModal: false,
            name: undefined,
            invited: undefined,
            books: this.props.books

        }
        this.bookingService = new BookingService()

    }

    componentDidMount = () => {
        this.setState({ currentDate: new Date(this.props.currentDate), loggedUser: this.props.loggedUser, books: this.props.books }, () => this.getBookingHours())
    }


    componentWillReceiveProps = (newprops) => {
        this.setState({ currentDate: new Date(newprops.currentDate), books: newprops.books }, () => this.getBookingHours())

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

//permite ver el nombre de las reservas so eres el owner o el dueño de la reserva
    isInvited = (elm) => {
        for (let i = 0; i < this.state.books.length; i++) {
            let goodDate = new Date(this.state.books[i].date)

            if (goodDate.toString() === elm.toString() && (this.props.loggedUser._id === this.props.local.owner || this.props.loggedUser._id === this.state.books[i].owner)) {
                let invited = this.state.books[i].invited
                return invited
            }
        }
    }



    isOwner = (elm) => {
        for (let i = 0; i < this.state.books.length; i++) {
            let goodDate = new Date(this.state.books[i].date)

            if (goodDate.toString() === elm.toString()) {
                let owner = this.state.books[i].owner
                return owner
            }
        }
    }

    //pinta el color de las celdas dependiendo de las reservas y de tus permisos


    isRed = (elm) => {
        for (let i = 0; i < this.state.books.length; i++) {
            let goodDate = new Date(this.state.books[i].date)
            if (goodDate.toString() === elm.toString()) {
                if (this.props.loggedUser._id !== this.props.local.owner && goodDate < Date.now()) {
                    return "hoursGrey"
                } else {
                    return "hoursRed"
                }
            }
        }
        if (elm < Date.now()) {
            return "hoursGrey"
        } else {
            return "hours"
        }
    }

    handleModal = (visible, elm) => this.setState({ showModal: visible, bookDate: elm })

  

    removeReh = elm => {
        let room = this.props.room
        let myBody = [this.props.loggedUser._id, elm, room]
        this.bookingService
            .deleteBook(myBody)
            .then(res => {
                if (res.status = 200) {
                    this.props.updateBooks(res.data.reservation)
              
                }
            })
            .catch(err => console.log('THIS IS MY ERROR: ', err))
    }

    isMinus24 = elm => {
        let timeNow = Date.now() / 1000
        let myDate = elm.getTime() / 1000
        if (myDate - timeNow < 86400) {
            return true
        } else {
            return false
        }
        // return true
    }

    handleClick = (elm) => {
        if (elm < Date.now() || (this.isRed(elm) === "hoursRed" && this.props.loggedUser._id !== this.props.local.owner && this.props.loggedUser._id !== this.isOwner(elm))) {

        } else if (this.isRed(elm) === "hoursRed" && (this.props.loggedUser._id === this.props.local.owner || this.props.loggedUser._id === this.isOwner(elm))) {
            if (window.confirm('¿Seguro que quieres borrar la reserva?')) {
                if (this.isMinus24(elm) && this.props.loggedUser._id !== this.props.local.owner) {
                    alert('No puedes borrar la reserva porque es demasiado tarde, ponte en contacto con la sala')
                } else {
                    this.removeReh(elm)
                }
            }
        }
        else {
            this.handleModal(true, elm)
        }
    }


    render() {


        return (
            this.state.bookingHours.length > 1 && this.state.books

                ?
                <>
                    {this.state.bookingHours.map((elm, idx) =>
                        <>
                            <div onClick={() => this.handleClick(elm)} className={this.isRed(elm)} > <p>{this.isInvited(elm) ? elm.getHours() + ":00  " + this.isInvited(elm) : elm.getHours()+ ':00'}</p></div>

                            <Modal className=" Modal" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                                <Modal.Body>
                                    <BookingModal className="animate__slideOutLeft"
                                        closeModal={() => this.handleModal(false)}
                                        date={this.state.bookDate}
                                        room={this.props.room}
                                        schedule={this.props.local.schedule}
                                        nameRoom={this.props.nameRoom}
                                        local={this.props.local}
                                        books={this.state.books}
                                        owner={this.props.loggedUser._id}
                                        localOwner={this.props.local.owner}
                                        updateBooks={this.props.updateBooks}
                                        rooms={this.state.local.room}
                                        storeUser={this.props.storeUser}
                                        loggedUser={this.props.loggedUser} />
                                </Modal.Body>
                            </Modal>
                        </>
                    )}
                </>
                :
                <Container className="center">
                    <h4><SubTitle text="-> CERRADO <-"></SubTitle></h4>
                </Container>
        )
    }




}


export default BookingSchedule