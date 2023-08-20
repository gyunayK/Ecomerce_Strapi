import axios from 'axios';




export const makeRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_API,

    headers:{
        Authorization: 'Bearer ' + import.meta.env.VITE_STRAPI_TOKEN
    }
})