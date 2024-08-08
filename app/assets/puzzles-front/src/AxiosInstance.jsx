import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3006',
    headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
})

export const baseUrl = 'http://localhost:3006'
export default instance