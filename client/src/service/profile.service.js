import axios from 'axios'

export default class ProfileService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/profile',
            withCredentials: true
        })
    }

    updateMembers = myBody => this.apiHandler.post('/updateMembers', myBody)
}