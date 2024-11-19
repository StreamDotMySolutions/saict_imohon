import React, { useState,useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
//import { useAuthStore } from "../stores/AuthStore"
import axios from './axios' // already prefixed with token

import useAuthStore from '../pages/Auth/stores/AuthStore'

const ProtectedRoute = () => {

    //const isLoggedIn = useAuthStore(state => state.isLoggedIn) // using zustand
    const store = useAuthStore()
    const url = process.env.REACT_APP_BACKEND_URL; // API server

    // check against laravel /api/user
    useEffect( () => {
    
        axios({
            method: 'get',
            url: `${url}/logged-user`, // localhist:8080/api/user ( sanctum protected )
        })
        .then(response => {
            console.log(response.data);
            useAuthStore.setState({user : response.data.user}) // user data
            useAuthStore.setState({isAuthenticated : true}) // system wide
 
        })
        .catch(error => {
            console.warn(error)
            if( error.response?.status === 401 ){ // 401 means unauthorized from laravel
                localStorage.removeItem('token') // remove the token
                useAuthStore.setState({user : null}) // user data
                useAuthStore.setState({isAuthenticated : false}) // system wide
            }
        })
        .finally( () => {
            
        })

        },[] ) // every time page is loaded


    //if(!isLoggedIn){
    if(!store.isAuthenticated){
        return <Navigate to='/sign-in-by-nric' replace />
    }

    return <Outlet />
}
export default ProtectedRoute