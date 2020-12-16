import React, { Component } from 'react'
import { Form, Col, Row, Container, Button, FormLabel } from 'react-bootstrap'
import LocalService from '../../../../service/local.service'




class EditRoomForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',


        }
        this.localService = new LocalService()

    }

    componentDidMount = () => {
        const room = this.props.match.params.rooom_id
        this.localService
            .getRooms(this.props.match.params)
            .then(res => {
                this.setState({ room: res.data[0], name: res.data[0].name, price: res.data[0].price, image: res.data[0].image, id: this.props.match.params.salaId }, () => this.setEquipment(res.data[0].equipment))

            })
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    setEquipment = (equipment) => {
        let equipmentList = []
        equipment.map((elm, idx) => {
            var equipo = {}
            equipo[idx] = elm

            equipmentList.push(equipo)
        }
        )
        this.setState({ equipment: equipmentList })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.localService
            .editRoom(this.state)
            .then(res => {
                this.props.history.push('/perfil')

            })
            .catch(err => console.log('Ha habido un error', err))
    }

    handleInputChangeEquipment = e => {

        console.log(this.state.equipment)
        const equipment = this.state.equipment
        equipment[e.target.name][e.target.name] = [e.target.value].toString()
        console.log(equipment)
        this.setState({ equipment: equipment })
    };

    // handle click event of the Remove button
    handleRemoveClick = index => {
        const list = this.state.equipment;
        list.splice(index, 1);
        this.setState({ equipment: list });

    };

    // handle click event of the Add button
    handleAddClick = () => {
        let add = {}
        console.log(this.state.equipment.length)
        add[this.state.equipment.length] = ""
        let equipment = this.state.equipment
        equipment.push(add)
        console.log(equipment)
        this.setState({ equipment: equipment })

    };

    render() {

        return (
            this.state.equipment ?
                <>
                    <Container>

                        <Row>

                            <Col md={{ span: 8, offset: 2 }}>
                                <h1>Editar sala</h1>
                                <hr />

                                <Form onSubmit={this.handleSubmit}>


                                    <Form.Group controlId="username">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="telephone">
                                        <Form.Label>Precio por hora</Form.Label>
                                        <Form.Control type="Text" name="price" value={this.state.price} onChange={this.handleInputChange} />
                                    </Form.Group>




                                    <Form.Group controlId="latitude">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="text" name="latitude" value={this.state.image} onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="equipment">
                                        <Form.Label>Equipmemt</Form.Label>
                                        {this.state.equipment.map((elm, index) =>
                                            <Row>

                                                <Col md={{ span: 9, offset: 0 }}>
                                                    <Form.Control type="Text" name={index} value={Object.values(this.state.equipment[index])} onChange={this.handleInputChangeEquipment} />
                                                </Col>
                                                <Col md={{ span: 3, offset: 0 }}>
                                                    <div className="btn-box flex">
                                                        <button className="remove"

                                                            onClick={() => this.handleRemoveClick(index)}>Remove</button>
                                                        {this.state.equipment.length - 1 === index && <button className="Add"

                                                            onClick={() => this.handleAddClick(index)}>Add</button>}
                                                    </div></Col>
                                            </Row>

                                        )}
                                    </Form.Group>


                                    <Button variant="dark" type="submit">Editar local</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </>
                :
                <h1>cargando</h1>
        )
    }
}

export default EditRoomForm
