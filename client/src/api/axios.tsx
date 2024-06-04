import axios from 'axios'

const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000/api/v1'
        : 'https://movies-app-api-4gj0.onrender.com/api/v1'
// : 'https://tomflix-api.cyclic.app/api/v1'

export default axios.create({ baseURL: BASE_URL })

// adding some axios interceptor which will work if the first response status is 403
// will refresh the token if it has expired
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})
