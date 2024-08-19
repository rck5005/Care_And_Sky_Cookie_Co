import { useState, useEffect } from 'react';
import { api } from '../utilities';

// Custom hook to fetch favorites and handle updates
const useFavoriteData = (endpoint) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        let response = await api.get(endpoint);
        setData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    // Function to add an item to favorites
    const addFavorite = async (itemId) => {
        await api.post(`mycookies/adjustfavorites/${itemId}/`, {});
        fetchData(); // Refresh data after adding
    };

    // Function to remove an item from favorites
    const removeFavorite = async (itemId) => {
        await api.put(`mycookies/adjustfavorites/${itemId}/`, {});
        fetchData(); // Refresh data after removing
    };

    return { data, addFavorite, removeFavorite };
};

export default useFavoriteData;