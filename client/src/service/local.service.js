import axios from 'axios'

export default class CoasterService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/local',
            withCredentials: true
        })
    }

    // getCoasters = () => this.apiHandler.get('/getAllCoasters')
    // getCoaster = coasterId => this.apiHandler.get(`/getOneCoaster/${coasterId}`)
    newLocal = localInfo => this.apiHandler.post('/new-local', localInfo)
}