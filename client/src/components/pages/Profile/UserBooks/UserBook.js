import UserBookCard from './UserBookCard'
import { Row, Col, Container } from 'react-bootstrap'
import './UserBook.css'

const UserBook = ({ books }) => {
    console.log('THE BOOKS', books)
    return (
        <>
            {books.map((elm, idx) =>
                <>
                    <Container>
                        <Row>
                            <Col sm={{ span: 6 }} className="pastBooks">
                                {new Date(elm.date) > new Date(Date.now())
                                    ?
                                    <UserBookCard elm={elm} key={idx} />
                                    : null}
                            </Col>
                            <Col sm={{ span: 6 }} className="futureBooks">
                                {new Date(elm.date) < Date.now()
                                    ?
                                    <UserBookCard elm={elm} key={idx} />
                                    : null}
                            </Col>

                        </Row>
                    </Container>
                </>
            )}
        </>
    )
}

export default UserBook