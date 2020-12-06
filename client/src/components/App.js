import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './layout/Navigation/navigation'
import Signup from './Signup/Signup'
import Login from './Login/Login'
import AuthService from './../service/auth.service'


class App extends Component{
    constructor() {
        super()
        this.state = {
            loggedInUser: undefined
        }
        this.authServices = new AuthService()
    }
    componentDidMount = () => {

        this.authServices   // comprobar si el usuario tenia sesion iniciada de antes
            .isLoggedIn()
            .then(response => this.setTheUser(response.data))
            .catch(err => this.setTheUser(undefined))
    }
    setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))

    render() {
        return (
            <>
                <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
                <Switch>
                    <main>
                        <Route path="/" render={() => <h1>Hola</h1>} />
                        <Route path="/inicio-sesion" render={props => <Login storeUser={this.setTheUser} {...props} />} />
                        <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />

                    </main>
                </Switch>
            </>
    )
}

}
export default App
