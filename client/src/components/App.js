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
import Locals from './pages/locals/locals'
import LocalDetails from './pages/locals/local-details'
import RoomForm from './pages/Local-form/room-form'
import EditForm from './pages/Local-form/edit-local-form'

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
                            <Route path="/perfil" render={(props) => this.state.loggedInUser ? <Profile {...props} loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />
                            <Route path="/nuevo-local" render={() => this.state.loggedInUser ? <LocalForm loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />
                            <Route path="/local/:local_id" render={props => <LocalDetails {...props} loggedUser={this.state.loggedInUser} />} />
                            <Route path="/editar-local/:local_id" render={props => <EditForm {...props}></EditForm>}/>
                            <Route path="/nueva-sala/:localId" render={(props) => <RoomForm {...props}></RoomForm>} />
                            <Route exact path="/" render={()=><Background></Background>} />
                        </main>
                    </>
                </Switch>
                {/* <Footer></Footer> */}
            </>
        )
    }

}
export default App
