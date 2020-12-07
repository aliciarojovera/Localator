import React, { Component } from 'react'
import LocalsService from './../../../service/local.service'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'


class LocalDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            local: undefined,
            
        }
        this.localsService = new LocalsService()
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount = () => {
        const local_id = this.props.match.params.local_id
        if (local_id) {
         
            this.localsService
                .getLocal(local_id)
                .then(res => this.setState({ local: res.data }))
                .catch(err => console.log(err))
        }
    }
    goBack() {
        this.props.history.goBack();
    }
    render() {
        return (
            <Container className="local-details">
                {this.state.local
                    ?
                    <>
                        {this.state.local.owner === this.props.loggedUser._id ? <Link to={`/nueva-sala/${this.state.local._id}`}>Nueva sala</Link>:null}

                        <h1> {this.state.local.name}</h1>
                        <Row>
                            <Col md={{ span: 6, offset: 1 }} >
                            </Col>
                            <Col md={3}>
                                <h3>Teléfono</h3>
                                <p>{this.state.local.telephone}</p>
                              
                                <div className="mapDetail">{this.state.local.location.coordinates}</div>
  <hr />
                                <Button onClick={this.goBack} className="btn btn-dark btn-block btn-sm">Go Back</Button>

                            </Col>
                        </Row>
                    </>
                    :
                    <h1>Cargando</h1>
                }

            </Container>
        )
    }
}

export default LocalDetails