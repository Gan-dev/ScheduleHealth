const axios = require('axios')

class ApiNews {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://api.nytimes.com/svc`
        })
    }
    getHomeNews() {
        return this.axiosApp.get(`/topstories/v2/home.json?api-key=${process.env.API_KEY_NEWS}`)
    }
    getNewsByTopic(topic) {
        return this.axiosApp.get(`/topstories/v2/${topic}.json?api-key=${process.env.API_KEY_NEWS}`)
    }
}

const apiNews = new ApiNews()

module.exports = apiNews

