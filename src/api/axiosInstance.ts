import axios from 'axios';
import {ApiError} from '../errors/ApiError.ts';

const axiosInstance = axios.create({
    baseURL: 'https://fortniteapi.io',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use(config => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = '97a4eb22-73d9832a-1e074b83-b6e12efd';
    // config.headers.Authorization = '';
    return config;
});

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        const status = err.response?.status;
        const message = err.response?.data?.message || err.message;
        const data = err.response?.data;

        throw new ApiError(message, status, data);
    }
);

export default axiosInstance