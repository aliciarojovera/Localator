import axios from 'axios'

export default class EmailService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/send-email',
            withCredentials: true
        })
    }

    sendEmail = email => this.apiHandler.post('/', email)
}