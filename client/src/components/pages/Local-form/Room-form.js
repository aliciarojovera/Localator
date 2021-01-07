import React, { Component } from 'react'
import localService from '../../../service/local.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import FilesService from '../../../service/upload.service'
import './Room-form.css'


class RoomForm extends Component {

    constructor(props) {

        super(props)

        this.state = {
            name: '',
            equipment: [{ 0: "" }],
            capacity: '',
            days: [''],
            schedule: '',
            local: '',
            image: '',
            price: ''

        }
        this.localService = new localService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => {
        const local_id = this.props.match.params.localId
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ local: local_id })
    }



    handleSubmit = e => {

        e.preventDefault()


        this.localService
            .newRoom(this.state)
            .then(res => {
                console.log(res)
                this.props.history.push(`/local/${this.state.local}`)

            })
            .catch(err => console.log('Ha habido un error', err))

    }


    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])


        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({ image: response.data.secure_url, uploadingActive: false })

                console.log(response)
            })
            
            .catch(err => console.log('ERRORRR!', err))
      
           
    }


    handleInputChangeEquipment = e => {

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
        add[this.state.equipment.length] = ""
        let equipment = this.state.equipment
        equipment.push(add)
        console.log(equipment)
        this.setState({ equipment: equipment })

    };

    render() {

        return (
            <>
                <Container>

                    <Row>
                        <Col md={{ span: 8, offset: 2 }} className="white">
                            <h1>Nueva sala</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="capacity">
                                    <Form.Label>Capacity</Form.Label>
                                    <Form.Control type="number" name="capacity" value={this.state.capacity} onChange={this.handleInputChange} />
                                </Form.Group>
                                {/* <Form.Group controlId="image">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleInputChange} />
                                </Form.Group> */}
                                <Form.Group controlId="image">
                                    <Form.Label>Imagen (archivo)</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>
                                <Form.Group controlId="equipment">
                                    <Form.Label>Equipment</Form.Label>
                                    {this.state.equipment.map((elm, index) =>
                                        <Row>

                                            <Col md={{ span: 9, offset: 0 }}>
                                                <Form.Control type="Text" name={index} value={Object.values(this.state.equipment[index])} onChange={this.handleInputChangeEquipment} />
                                            </Col>
                                            <Col md={{ span: 3, offset: 0 }}>
                                                <div className="btn-box flex">
                                                    <button className="remove"

                                                        onClick={() => this.handleRemoveClick(index)} className="btn-retro">Remove</button>
                                                    {this.state.equipment.length - 1 === index && <button className="btn-retro"

                                                        onClick={() => this.handleAddClick(index)}>Add</button>}
                                                </div></Col>
                                        </Row>

                                    )}
                                </Form.Group>

                                <Form.Group controlId="price">
                                    <Form.Label>Precio por hora</Form.Label>
                                    <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
                                </Form.Group>

                                <br>

                                </br>
                                <Button variant="dark" type="submit" className="btn-retro">Crear sala</Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default RoomForm
