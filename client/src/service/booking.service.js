import axios from 'axios'

export default class BookingService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/books',
            withCredentials: true
        })
    }

    getBooks= roomsId => this.apiHandler.post('/findBooks', roomsId)
    newBook = bookInfo => this.apiHandler.post('/newBook', bookInfo)
}