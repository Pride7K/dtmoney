import axios from "axios"


const api = axios.create({
    baseURL:"https://dtmoney-3b7c1.web.app/api"
})

export {api}