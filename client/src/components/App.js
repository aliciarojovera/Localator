import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/navigation'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import AuthService from './../service/auth.service'
import Profile from './pages/Profile/Profile'
import LocalForm from './pages/Local-form/local-form'
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
                .catch(err => this.setTheUser(undefined))
        }
    }
    setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))

    render() {


        return (
            <>
                <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
                <Switch>
                    <>
                        <main>
                            <Route path="/inicio-sesion" render={props => <Login storeUser={this.setTheUser} {...props} />} />
                            <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
                            <Route path="/perfil" render={props => this.state.loggedInUser ? <Profile loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />
                            <Route path="/nuevo-local" render={() => this.state.loggedInUser ? <LocalForm loggedUser={this.state.loggedInUser} /> : <Redirect to="/inicio-sesion" />} />
                        </main>
                    </>
                </Switch>
            </>
        )
    }

}
export default App
