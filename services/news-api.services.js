const axios = require('axios')

class ApiNews {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://content.guardianapis.com`
        })
    }
    getSearchNews() {
        return this.axiosApp.get(`/search?page=2&q=debate&api-key=${process.env.API_KEY_NEWS}`)
    }

    getAllNews() {
        return this.axiosApp.get('/tags')
    }
    getSectionsNews() {
        return this.axiosApp.get('/sections')
    }
}


const apiNews = new ApiNews()

module.exports = apiNews

