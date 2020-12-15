
import { Component } from 'react'
import { Container } from 'react-bootstrap'

class ProfileUser extends Component {

    constructor(props) {
        super(props)
        this.state={
            loggedUser: this.props.loggedUser,
            books:this.props.loggedUser.reservation
        }
    }



    render() {
        return (
            <Container>
                <h1>¡Bienvenid@, {this.state.loggedUser.username}!</h1>

                <h2>Tus reservas</h2>
            </Container>
        )
    }
}

export default ProfileUser