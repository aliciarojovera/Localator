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
            loggedUser:undefined
        }
        this.bookingService = new BookingService()

    }

    componentDidMount = () => {
        this.setState({ currentDate: new Date(this.props.currentDate), loggedUser: this.props.loggedUser }, () => this.getBookingHours())
    }


    componentWillReceiveProps = (newprops) => {
        this.setState({ currentDate: new Date(newprops.currentDate) }, () => this.getBookingHours())

    }

    getBookingHours = () => {
        let idxDayWeek = this.state.currentDate.getDay()
        const bookingHours = []
        for (let i = parseInt(this.state.local.schedule.openHour[idxDayWeek - 1]); i < parseInt(this.state.local.schedule.closeHour[idxDayWeek - 1]); i++) {

            bookingHours.push(new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), this.state.currentDate.getDate(), i, 0))
        
        }
        this.setState({ bookingHours: bookingHours })
   

    }


    book = (elm, idx) => {
        const bookDate = elm
        const room = this.props.sala
        this.setState({ bookDate: bookDate, bookRoom: room }, () => this.newBook(elm, idx))

     
    }


    newBook = (elm, idx) => {
        this.bookingService

            .newBook(this.state)

    }



    render() {


        return (
            <>
                {this.state.bookingHours.map((elm, idx) => <div onClick={() => this.book(elm, idx)} className="hours" key={idx}> <p>{elm.getHours()}</p></div>)}
            </>
        )
    }




}


export default BookingSchedule