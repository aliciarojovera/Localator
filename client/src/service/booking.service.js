import axios from 'axios'

export default class BookingService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/books`,
            withCredentials: true
        })
    }

    getBooks= roomsId => this.apiHandler.post('/findBooks', roomsId)
    newBook = bookInfo => this.apiHandler.post('/newBook', bookInfo)
    findBooks = booksId => this.apiHandler.post('/findBooksById', booksId)
    deleteBook = bookInfo => this.apiHandler.post('/deleteBook', bookInfo)
    findUserBooks = info => this.apiHandler.post('/findUserBooks', info)

}