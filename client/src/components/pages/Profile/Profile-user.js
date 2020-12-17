import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BookingService from './../../../service/booking.service'
import MemberForm from './Members/MemberForm'
import UserBook from './UserBooks/UserBook'

class ProfileUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedUser: this.props.loggedUser,
            books: undefined
        }
        this.bookingService = new BookingService()

    }

    //=====> USER BOOKS <=====
    componentDidMount = () => {
        this.bookingService
            .findUserBooks(this.props.loggedUser.reservation)
            .then(res => this.setState({ books: res.data }))
    }


    render() {
        return (
            <Container>
                <h1>¡Bienvenid@, {this.state.loggedUser.username}!</h1>

                <MemberForm user={this.state.loggedUser} storeUser={this.props.storeUser} />

                <h2 className="cardTitle" >Tus reservas</h2>


                {this.state.books
                    ?
                    <>
                        <UserBook books={this.state.books} />
                    </>
                    :
                    <h1>cargando</h1>
                }
            </Container>
        )
    }
}

export default ProfileUser