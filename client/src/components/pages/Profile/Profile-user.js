
import { Container } from 'react-bootstrap'

const ProfileUser = ({ user }) => {
    return (
        <Container>
            <h1>¡Bienvenid@, {user.username}!</h1>
            <h2>eres User</h2>
        </Container>
    )
}

export default ProfileUser