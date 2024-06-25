import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/AuthStore';

const HandleLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + '/logout';
    const options = {
      method: 'get',
      credentials: 'include', // include credentials to ensure cookies are sent with the request
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          // Clear local storage
          localStorage.removeItem('token');

          // Update zustand state
          logout();

          // Redirect to login or home page
          navigate('/login');
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [logout, navigate]);

  return null;
};

export default HandleLogout;
