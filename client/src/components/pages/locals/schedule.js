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
            hour:''
        }
        this.localsService = new LocalsService()

    }

    componentDidMount = () => {
        if (this.props) {
            console.log(this.props)
                this.setState({})

            if (this.props.dayWeek==="Tue"){
                console.log(this.props.local.schedule.closeHour[4].day)
                let a = Array.from({ length: parseInt(this.props.local.schedule.closeHour[4].day) - parseInt(this.props.local.schedule.openHour[4].day) }, (v, k) => k + parseInt(this.props.local.schedule.openHour[4].day))
                this.setState({ hours: a })
                console.log(a)
            }




        }

    }
    setRoom=(roomid)=> {
        const room_id = roomid
        this.setState({ room: room_id })
        console.log(this.state.room)
    }
    
    newBook = (elm) => {
        this.setState({hour:elm})
        this.localsService
        .newBook(this.state)
    }

    render() {
        return (
            <>
                {this.props
                    ?
                    <>

                        {this.props.room.map(element =>

                            <Col className="table-col" >
                                <div onClick={() =>this.setRoom(element._id)}>
                                <h2>{element.name}</h2>
                                
                                {this.state.hours.map(elm =>
                                    

                                    <Link onClick={() => this.newBook(elm)}><div className="table" ><p>{elm}</p></div></Link>

                                )}
</div>
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