const axios = require('axios')

class ApiNews {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://api.nytimes.com/svc/topstories`
        })
    }
    getHomeNews() {
        return this.axiosApp.get(`/v2/home.json?api-key=${process.env.API_KEY_NEWS}`)
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

