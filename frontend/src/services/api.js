import axios from 'axios';

// Pointing to your Express backend running on port 5000
const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Automatically attach JWT token to requests if it exists in local storage
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;