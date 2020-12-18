import React from "react";
import { Form, Col, Row, Button } from 'react-bootstrap'
import './MemberCard.css'

const MemberCard = ({ addOne, takeOne, name, mail, onChange, id }) => {
    return (
        <>
            <Form.Group className="formCard">
                <Form.Label style={{ color: "white" }} className="miembreTitle">Miembrx {id + 1}</Form.Label>
                <Row>
                    <Col sm={{ span: 5 }}>
                        <Form.Label style={{ color: "white" }}>Nombre</Form.Label>
                        <Form.Control type="text" name="memberName" onChange={onChange()} id={id} placeholder="Nombre" defaultValue={name} />
                    </Col>
                    <Col sm={{ span: 5 }}>
                        <Form.Label style={{ color: "white" }}>Mail</Form.Label>
                        <Form.Control type="text" name="memberMail" onChange={onChange()} id={id} placeholder="Mail" defaultValue={mail} />
                    </Col>
                    <Col sm={{ span: 2 }}>
                        <Button className="addBtn" variant="success" onClick={addOne}>+</Button>
                        <Button className="takeBtn" variant="danger" onClick={takeOne}>x</Button>
                    </Col>
                </Row>
            </Form.Group>
        </>

    )
}

export default MemberCard