import axios from 'axios'

export default class ProfileService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/profile`,

            withCredentials: true
        })
    }

    updateMembers = myBody => this.apiHandler.post('/updateMembers', myBody)
}