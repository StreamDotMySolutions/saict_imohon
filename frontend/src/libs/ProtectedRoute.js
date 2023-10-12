import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from "../stores/AuthStore"

const ProtectedRoute = () => {

    const isLoggedIn = useAuthStore(state => state.isLoggedIn) // using zustand

    if(!isLoggedIn){
        return <Navigate to='/sign-in' replace />
    }

    return <Outlet />
}
export default ProtectedRoute