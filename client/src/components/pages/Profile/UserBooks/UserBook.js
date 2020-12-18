import UserBookCard from './UserBookCard'
import { Row, Col, Container } from 'react-bootstrap'
import './UserBook.css'
import SubTitle from '../../../layout/Home/SubTitle'
import SubTitle2 from '../../../layout/Home/SubTitle2'
import Loader from '../../../layout/Loader/Loader'

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
                <h5 className="cardTitle"><SubTitle text="Futuras"></SubTitle></h5>
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
                <h5 className="cardTitle"><SubTitle text="Pasadas"></SubTitle></h5>
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