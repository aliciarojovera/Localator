
import { Container } from 'react-bootstrap'
import ProfileUser from './Profile-user'
import ProfileOwner from './Profile-owner'
const Profile = ({ loggedUser }) => {
    return (
        <Container>
            
            {loggedUser.role === 'OWNER' ? <ProfileOwner loggedUser={loggedUser} /> : <ProfileUser loggedUser={loggedUser}/>}

        </Container>
    )
}

export default Profile