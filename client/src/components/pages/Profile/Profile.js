
import { Container } from 'react-bootstrap'
import ProfileUser from './Profile-user'
import ProfileOwner from './Profile-owner'
const Profile = ({ loggedUser, storeUser }) => {
    return (
        <Container>
            
            {loggedUser.role === 'OWNER' ? <ProfileOwner loggedUser={loggedUser} /> : <ProfileUser loggedUser={loggedUser} storeUser={storeUser}/>}

        </Container>
    )
}

export default Profile