import UserBookCard from './UserBookCard'
import { Row, Col, Container } from 'react-bootstrap'
import './UserBook.css'

const UserBook = ({ books }) => {
    //ordenar dates
    books.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
    })
    
    
    return (
        <>
            <Container>
                <hr></hr>
                <br></br>
                <h5 className="cardTitle">Futuras</h5>
                <br></br>
                <hr></hr>
                <Row>
                    {books.map((elm, idx) =>
                        new Date(elm.date) > Date.now()
                            ?
                            <>
                                <UserBookCard elm={elm} key={idx} mode="future" />
                            </>
                            : null
                    )}
                </Row>
                <hr></hr>
                <br></br>
                <h5 className="cardTitle">Pasadas</h5>
                <br></br>
                <hr></hr>
                <Row>
                    {books.map((elm, idx) =>
                        new Date(elm.date) < Date.now()
                            ?
                            <>
                                <UserBookCard elm={elm} key={idx} mode="past" />
                            </>
                            : null
                    )}

                </Row>
            </Container>
        </>
    )
}

export default UserBook