import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import './schedule.css'
import { Link } from 'react-router-dom'
import LocalsService from './../../../service/local.service'


class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {
            local: undefined,
            hours: [],
            date: undefined,
            room: undefined,
            hour: '',
            loggedUser:''
        }
        this.localsService = new LocalsService()

    }

    componentDidMount = () => {
        this.dateInterval =setInterval(() =>{
      
            if (this.props.dayWeek === "Mon") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[0]) - parseInt(this.props.local.schedule.openHour[0]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[0]))
                this.setState({ hours: a })
            }
            if (this.props.dayWeek === "Tue") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[1]) - parseInt(this.props.local.schedule.openHour[1]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[1]))
                this.setState({ hours: a })
            }
            if (this.props.dayWeek === "Wed") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[2]) - parseInt(this.props.local.schedule.openHour[2]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[2]))
                this.setState({ hours: a })
            }
            if (this.props.dayWeek === "Thu") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[3]) - parseInt(this.props.local.schedule.openHour[3]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[3]))
                this.setState({ hours: a })
            }
            if (this.props.dayWeek === "Fri") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[4]) - parseInt(this.props.local.schedule.openHour[4]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[4]))
                this.setState({ hours: a })
            }
            if (this.props.dayWeek === "Sat") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[5]) - parseInt(this.props.local.schedule.openHour[5]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[5]))
                this.setState({ hours: a })
            }
            if (this.props.dayWeek === "Sun") {
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[6]) - parseInt(this.props.local.schedule.openHour[6]) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[6]))
                this.setState({ hours: a })
            }}, 100)

    }
    componentWillUnmount() {
        clearInterval(this.dateInterval)
    }
    setRoom = (roomid) => {
        const room_id = roomid
        this.setState({ room: room_id })
    }

    newBook = (elm) => {
        this.setState({ hour: elm })
        this.setState({loggedUser:this.props.loggedUser})
        this.setState({ date: this.props.date })
        this.localsService
            .newBook(this.state)
    }
  
    render() {

        return (
            <>
                {this.props.local.schedule
                    ?
                    <>
                        {this.props.room.map((element, idx) =>
                                
                            <Col key={idx} className="table-col" onClick={() => this.setRoom(element._id)} >
                              

                                    <h2>{element.name}</h2>

                                    {this.state.hours.map((elm, idx) =>
                                        <Link key={idx} onClick={() => this.newBook(elm, this.state)}><div className="table" ><p>{elm}</p></div></Link>
                                    )}

                            </Col>)}
                    </>

                    :
                    null
                }

            </>

        )

    }



}
export default Table