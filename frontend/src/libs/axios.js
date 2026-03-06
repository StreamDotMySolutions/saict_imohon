import Axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const axios = Axios.create({
    baseURL:  (process.env.REACT_APP_BACKEND_URL),
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    //withCredentials: true,
    
})

// intercept every request
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // get the token set by signin

        // custom headers
        config.headers['Authorization'] =  `Bearer ${token}` // Authorization
        config.headers['Accept'] = 'application/json' // return reesponse in JSON

        return config; // return back config()
    },
    (error) => {
      return Promise.reject(error);
    }
);

// detect 401 or 403 — skip auth endpoints so login/register can show their own errors
const AUTH_PATHS = ['/login', '/login-by-nric', '/register', '/password/email', '/password/reset'];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const isAuthEndpoint = AUTH_PATHS.some(path => url.includes(path));

    if (!isAuthEndpoint && (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 419)) {
      window.location.href = '/unauthorized';
    }

    return Promise.reject(error);
  }
);

export default axios
