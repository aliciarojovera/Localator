
import { Component } from 'react'
import { Container } from 'react-bootstrap'
import BookingService from './../../../service/booking.service'


class ProfileUser extends Component {

    constructor(props) {
        super(props)
        this.state={
            loggedUser: this.props.loggedUser,
            books:undefined
        }
        this.bookingService = new BookingService()

    }
    componentDidMount = () => {
     
            this.bookingService
                .findBooks(this.props.loggedUser.reservation)
                .then(res => this.setState({ books: res.data }))
        console.log(this.state.books)
        

    }


    render() {
        return (
            <Container>
                <h1>¡Bienvenid@, {this.state.loggedUser.username}!</h1>

                <h2>Tus reservas</h2>
                {this.state.books
                
                    ?
            
                        this.state.books.map(elm =>
                      <div>
                                <p>{new Date(elm.date).getHours()} / {new Date(elm.date).getMonth() + 1} / {new Date(elm.date).getFullYear()}</p>
                        </div>
                        )
                    :
                    <h1>cargando</h1>
   }
            </Container>
        )
    }
}

export default ProfileUser