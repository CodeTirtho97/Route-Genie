import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api", // Default fallback
});

// Automatically add token to protected requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, (error) => Promise.reject(error));

export default API;
