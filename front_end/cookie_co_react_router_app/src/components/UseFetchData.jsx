import { useState, useEffect } from 'react';
import { api } from '../utilities'

const useFetchData = (endpoint) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get(endpoint);
            setData(response.data);
        };

        fetchData();
    }, [endpoint]);

    return data;
};

export default useFetchData;