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
    getNewBySection(section) {
        return this.axiosApp.get(`/v2/search?${process.env.API_KEY_NEWS}`)
    }
}

const apiNews = new ApiNews()

module.exports = apiNews

