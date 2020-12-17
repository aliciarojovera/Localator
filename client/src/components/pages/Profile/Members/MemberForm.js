import React, { Component } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import MemberCard from './MemberCard'
import ProfileService from './../../../../service/profile.service'
import './MemberForm.css'

class MemberForm extends Component {
    constructor() {
        super()
        this.state = {
            members: [{
                memberName: undefined,
                memberMail: undefined,
                id: undefined,
            }]
        }
        this.ProfileService = new ProfileService()
    }

    componentDidMount() {
        const user = this.props.user
        if (!user.members[0]) {
            console.log('No tiene members')
        } else {
            console.log('si tiene members')
            console.log(user.members)
            this.setState({ members: user.members })
        }
    }

    addOne = () => {
        let members = [...this.state.members]
        let newMemberId = members.length
        let newMember = { memberName: undefined, memberMail: undefined, id: newMemberId }
        members.push(newMember)
        this.setState({ members: members })
    }

    takeOne = (id) => {
        let members = this.state.members
        members = members.filter(elm => elm.id !== id)
        this.setState({ members })
    }

    handleChanges = e => {
        let id = e.target.id
        if (!id) { id = '0' }
        let myName = e.target.name
        let myValue = e.target.value
        let membersCopy = [...this.state.members]
        membersCopy[id] = { ...membersCopy[id], [myName]: myValue, id }
        this.setState({ members: membersCopy })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (window.confirm('Desea guardar los cambios?')) {
            let myBody = [this.state.members, this.props.user]
            this.ProfileService
                .updateMembers(myBody)
                .then(res => {
                    this.props.storeUser(res.data)
                })
        }
    }

    render() {
        return (
            <div className="mainMemberForm">
                <Container>

                    <Form onSubmit={this.handleSubmit}>
                        <h3>Añade a los miembros de tu banda</h3>
                        <p>(Se enviará email con la info de las reservas que realices)</p>

                        {this.state.members.map((elm, idx) =>
                            <MemberCard
                                key={idx}
                                addOne={() => this.addOne()}
                                takeOne={() => this.takeOne(elm.id)}
                                name={elm.memberName}
                                mail={elm.memberMail}
                                onChange={() => this.handleChanges}
                                id={idx}
                            />
                        )}
                        <Button className="formSubmit" type="submit" variant="warning">Guardar Cambios</Button>
                    </Form>
                </Container>
            </div>
        )
    }

}

export default MemberForm