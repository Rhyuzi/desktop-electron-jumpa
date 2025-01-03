import axios from 'axios'
let baseURL = `https://dinda.jumpa.id/api/v1.0.0`
let apiKey = process.env.VUE_APP_APIKEY
const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        "X-Api-Key": apiKey,
    },
})
export default instance