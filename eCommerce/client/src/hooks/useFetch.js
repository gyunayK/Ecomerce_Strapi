import { useEffect, useState } from 'react'
import axios from 'axios'

const token = import.meta.env.VITE_STRAPI_TOKEN

export default function useFetch (url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!url || url.includes('null')) return
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(res.data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)

            }
        }
        fetchProducts()
    }, [url])

    return { data, loading, error }
}
