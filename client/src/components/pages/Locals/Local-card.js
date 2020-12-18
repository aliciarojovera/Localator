import { Col, Card } from 'react-bootstrap'
import './LocalCard.css'
import { Link } from 'react-router-dom'
import SubTitle2 from '../../layout/Home/SubTitle2'

const LocalCard = ({ name, _id, owner, loggedUser }) => {
    
    return (
        <Col lg={4}>
            <Card className="local-card">
                <Card.Body >
                    
                    <Card.Title> <SubTitle2 text={name}>{name}</SubTitle2></Card.Title>

                    <Link className="btn btn-dark btn-block btn-sm btnDetails" to={`/local/${_id}`}>Ver detalles</Link>

                    
                    {loggedUser === owner ? <Link className="btn btn-dark btn-block btn-sm btnEditLocal" to={`/editar-local/${_id}`} >Editar local </Link> : null}
                   
                </Card.Body>
            </Card>
        </Col>
    )
}

export default LocalCard