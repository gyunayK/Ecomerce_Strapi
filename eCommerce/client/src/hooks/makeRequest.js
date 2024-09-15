import axios from 'axios'

const token = import.meta.env.VITE_STRAPI_TOKEN

export const makeRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_API,
    headers: {
        Authorization: 'Bearer ' + token,
    }
})