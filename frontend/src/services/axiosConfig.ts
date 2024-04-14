import axios from 'axios';

// Базовый URL API
const API_URL = 'http://localhost:3000';


const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,  
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;