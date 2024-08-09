import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://server.testpuzzle.ge:3006',
    headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
})

export const baseUrl = 'http://server.testpuzzle.ge:3006'
export default instance