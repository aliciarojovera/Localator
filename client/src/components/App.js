import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Background from './layout/Background/header'
import Navigation from './layout/Navigation/navigation'
import Signup from './pages/Signup/Signup'
import SignupOwner from './pages/Signup/Signup.Owner'
// import Footer from './layout/Navigation/foot'
import Login from './pages/Login/Login'
import AuthService from './../service/auth.service'
import Profile from './pages/Profile/Profile'
import LocalForm from './pages/Local-form/local-form'
import Locals from './pages/Locals/locals'
import LocalDetails from './pages/Locals/local-details'
import RoomForm from './pages/Local-form/room-form'
import EditRoomForm from './pages/Locals/Rooms/Edit-room-form'
import EditForm from './pages/Local-form/edit-local-form'
import RoomDetails from './pages/Locals/Rooms/Room-details'

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedInUser: undefined
        }
        this.authServices = new AuthService()
    }
    componentDidMount = () => {

        if (this.state.loggedInUser === undefined) {
            this.authServices
                .isLoggedIn()
                .then(response => this.setTheUser(response.data))
                .catch(() => this.setTheUser(undefined))
        }
        console.log(this.state.loggedInUser)
    }
    setTheUser = user => this.setState({ loggedInUser: user })

    render() {


        return (
            <>
                <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
                <Switch>
                    <>
                        <main>
                            <Route path="/inicio-sesion" render={props => <Login storeUser={this.setTheUser} {...props} />} />
                            <Route path="/registro-local" render={props => <SignupOwner storeUser={this.setTheUser} {...props} />} />
                            <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
                            <Route path="/locales" render={(props) => <Locals {...props} loggedUser={this.state.loggedInUser}></Locals>} ></Route>
                            <Route path="/perfil" render={(props) => this.state.loggedInUser ? <Profile {...props} loggedUser={this.state.loggedInUser} storeUser={this.setTheUser} /> : <Redirect to="/inicio-sesion" />} />
                            <Route path="/nuevo-local" render={(props) => this.state.loggedInUser ? <LocalForm {...props} loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />
                            <Route path="/local/:local_id" render={props => <LocalDetails {...props} loggedUser={this.state.loggedInUser} storeUser={this.setTheUser} />}/>
                            <Route path="/editar-local/:local_id" render={props => <EditForm {...props}></EditForm>}/>
                            <Route path="/nueva-sala/:localId" render={(props) => <RoomForm {...props}></RoomForm>} />
                            <Route path="/editar-sala/:salaId" render={props => <EditRoomForm {...props}></EditRoomForm>} />

                            <Route path="/sala/:salaId" render={props => <RoomDetails {...props} loggedUser={this.state.loggedInUser} storeUser={this.setTheUser}></RoomDetails>}/>
                            <Route exact path="/" render={() => <Background></Background>} />
                            <Route path="/logout" render={() => <Redirect to="/" />} />

                        </main>
                    </>
                </Switch>
                {/* <Footer></Footer> */}
            </>
        )
    }

}
export default App
