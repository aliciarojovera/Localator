import { Col, Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const LocalCard = ({ name, location, _id, owner, loggedUser }) => {
    return (
        <Col lg={4}>
            <Card className="Local-card">
                <Card.Body>
                    
                    <Card.Title>{name}</Card.Title>

                    <Link className="btn btn-dark btn-block btn-sm" to={`/local/${_id}`}>Ver detalles</Link>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default LocalCard