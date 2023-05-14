const axios = require('axios')

class ApiNews {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://content.guardianapis.com/'
        })
    }
    getSearchNews() {
        return this.axiosApp.get('/search')
    }

    getAllNews() {
        return this.axiosApp.get('/tags')
    }
    getSectionsNews() {
        return this.axiosApp.get('/sections')
    }
}
