import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BookingService from './../../../service/booking.service'
import MemberForm from './Members/MemberForm'
import UserBook from './UserBooks/UserBook'
import SubTitle from '../../layout/Home/SubTitle'
import SubTitle2 from '../../layout/Home/SubTitle2'
import Loader from '../../layout/Loader/Loader'

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
                <br></br>
                <h1><SubTitle text={String.raw`Bienvenidx, ${this.state.loggedUser.username}!!`} /></h1>
                <br></br>

                <MemberForm user={this.state.loggedUser} storeUser={this.props.storeUser} />

                <h2 className="cardTitle" ><SubTitle text="Tus reservas"></SubTitle></h2>


                {this.state.books
                    ?
                    <>
                        <UserBook books={this.state.books} />
                    </>
                    :
                    <Loader></Loader>
                }
            </Container>
        )
    }
}

export default ProfileUser