import { useEffect, useState } from "react";
import axios from "axios";

const token = import.meta.env.VITE_STRAPI_TOKEN;

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoding(true);
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(res.data.data);
            } catch (error) {
                setError(true);
            } finally {
                setLoding(false);

            }
        };
        fetchProducts();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
