import Axios from 'axios'

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
  )


export default axios
