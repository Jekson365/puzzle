import axios from 'axios'

const instance = axios.create({
    baseURL:'https://puzzletest.onrender.com'
})

export const baseUrl = 'https://puzzletest.onrender.com'
export default instance