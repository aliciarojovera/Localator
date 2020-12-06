
import { Button, Container } from 'react-bootstrap'

import {Link} from 'react-router-dom'

const ProfileOwner = ({ user }) => {
    
    return (
        <Container>
            <h1>¡Bienvenid@, {user.username}!</h1>
            <h2>eres {user.role}</h2>
            <Link to="/nuevo-local"><Button>New Local</Button></Link>
        </Container>
    )
}

export default ProfileOwner