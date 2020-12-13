import { Component } from 'react'
import './bookingSchedule.css'
import BookingService from '../../../../service/booking.service'



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
            books: undefined
        }
        this.bookingService = new BookingService()

    }

    componentDidMount = () => {
        this.setState({ currentDate: new Date(this.props.currentDate), loggedUser: this.props.loggedUser, books:this.props.books}, () => this.getBookingHours())
                // console.log(this.props)

    }


    componentWillReceiveProps = (newprops) => {
        this.setState({ currentDate: new Date(newprops.currentDate) }, () => this.getBookingHours())

    }

    getBookingHours = () => {
        let idxDayWeek = this.state.currentDate.getDay()
        const bookingHours = []

        if (idxDayWeek === 0) {
            for (let i = parseInt(this.state.local.schedule.openHour[6]); i < parseInt(this.state.local.schedule.closeHour[6]); i++) {

                bookingHours.push(new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate(), i, 0))

            }
        }
        else{
        for (let i = parseInt(this.state.local.schedule.openHour[idxDayWeek - 1]); i < parseInt(this.state.local.schedule.closeHour[idxDayWeek - 1]); i++) {

            bookingHours.push(new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate(), i, 0))
        
        }}
        this.setState({ bookingHours: bookingHours })
   console.log(this.state.local.schedule)

    }


    book = (elm, idx) => {
        const bookDate = elm
        const room = this.props.sala
        this.setState({ bookDate: bookDate, bookRoom: room }, () => this.newBook(elm, idx))
    }


    newBook = (elm, idx) => {
        console.log(this.state.bookDate)
        this.bookingService
            .newBook(this.state)
    }


    // Verifica si la hora (el elemento mapeado en className) está en la reserva, si lo está
    // Devuelve TRUE, entonces le pone la clase hoursRed, si no la clase Hours
    isRed = (elm, room) => {
        //Por cada reserva entra en bucle
        for (var i = 0; i < this.state.books.length; i++) {
            let goodDate = new Date(this.state.books[i].date)
            if (goodDate == elm.toString() && this.state.books[i].room == room) {
                //Si la hora y la room es la misma, devuelve True y pinta de rojo
                return true
            }
        }
    }


    render() {


        return (
            this.state.bookingHours&&this.state.books
                
                ?
            <>
                    {this.state.bookingHours.map((elm, idx) =>
                        <div onClick={() => this.book(elm, idx)} className={this.isRed(elm, this.props.sala) ? "hoursRed": "hours"} key={idx}> <p>{elm.getHours()}</p></div>
                    )}
                </>
                :null
        )
    }




}


export default BookingSchedule