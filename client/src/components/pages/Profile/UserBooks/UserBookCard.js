import { Card, Button } from 'react-bootstrap'

const UserBookCard = ({ elm, mode }) => {
    console.log('MYELM: ', elm)
    return (
        <>
    


            <Card
                style={{ width: '16rem' }}
                className={mode === "past" ? "pastCard" : "futureCard"}
            >
                <Card.Img variant="top" src={elm.room ? elm.room.image : "http://www.thecavanproject.com/wp-content/uploads/2013/06/band-rehearsal.jpg"} alt="Card Image" />
                <Card.Body>
                    <Card.Title>Día: {new Date(elm.date).toDateString()}</Card.Title>
                    <Card.Text>
                        <div>Hora: {new Date(elm.date).getUTCHours()}:00</div>
                        <div>Local: {elm.room ? elm.room.local.name : ""}</div>
                        <div>Sala: {elm.room ? elm.room.name : ""}</div>
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}

export default UserBookCard