import axios from 'axios'

export default class LocalService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/local',
            withCredentials: true
        })
    }

    getLocals = () => this.apiHandler.get('/getAllLocals')
    getLocal = localId => this.apiHandler.get(`/getOneLocal/${localId}`)
    newLocal = localInfo => this.apiHandler.post('/new-local', localInfo)
}