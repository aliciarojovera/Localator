import axios from 'axios'

export default class LocalService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/api/local`,

            withCredentials: true
        })
    }

    getLocals = () => this.apiHandler.get('/getAllLocals')
    getLocal = localId => this.apiHandler.get(`/getOneLocal/${localId}`)
    editLocal = localInfo => this.apiHandler.post(`/edit-local`, localInfo)
    newLocal = localInfo => this.apiHandler.post('/new-local', localInfo)
    newRoom = localInfo => this.apiHandler.post(`/new-room/`, localInfo)
    getRooms = roomsInfo => this.apiHandler.post('/getRooms', roomsInfo)
    newBook = bookInfo => this.apiHandler.post('/newBook', bookInfo)
    editRoom = roomInfo=> this.apiHandler.post('/edit-room', roomInfo)
}