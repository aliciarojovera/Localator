import axios from 'axios'

export default class EmailService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/send-email`,

            withCredentials: true
        })
    }

    sendEmail = email => this.apiHandler.post('/', email)
}