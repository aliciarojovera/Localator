import axios from 'axios'

export default class BookingService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/books',
            withCredentials: true
        })
    }

    newBook = bookInfo => this.apiHandler.post('/newBook', bookInfo)
    getBooks= roomId => this.apiHandler.post('/findBooks', roomId)
}