
import { Container } from 'react-bootstrap'
import ProfileUser from './Profile-user'
import ProfileOwner from './Profile-owner'
const Profile = ({ user }) => {
    console.log("AHI VA")
    console.log(user.role)
    return (
        <Container>
            {user.role === 'OWNER' ? <ProfileOwner user = {user}/> : <ProfileUser user={user}/>}

        </Container>
    )
}

export default Profile