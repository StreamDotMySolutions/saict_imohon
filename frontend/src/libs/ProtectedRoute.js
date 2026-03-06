import React, { useEffect } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from './axios' // already prefixed with token

import useAuthStore from '../pages/Auth/stores/AuthStore'

const ProtectedRoute = () => {

    const store = useAuthStore()
    const url = process.env.REACT_APP_BACKEND_URL; // API server

    // check against laravel /api/user
    useEffect( () => {

        axios({
            method: 'get',
            url: `${url}/logged-user`,
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

        },[] ) // every time page is loaded

    if(!store.isAuthenticated){
        return <Navigate to='/sign-in-by-nric' replace />
    }

    // Block access if email not verified
    if (!store?.user?.email_verified_at) {
        return (
            <Container className='d-flex align-items-center justify-content-center py-5'>
                <Card className='border-0 shadow-lg' style={{ maxWidth: '500px', width: '100%' }}>
                    <Card.Body className='p-5 text-center'>
                        <div className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-envelope-circle-check' size='3x' className='text-warning' />
                        </div>
                        <h4 className='fw-bold mb-3'>Pengesahan Email Diperlukan</h4>
                        <p className='text-muted mb-3'>
                            Sila sahkan alamat email anda untuk mengakses sistem ini.
                            Email pengesahan telah dihantar ke:
                        </p>
                        <p className='fw-semibold mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-2' />
                            {store.user?.email}
                        </p>
                        <p className='text-muted small mb-4'>
                            Sila semak peti masuk atau folder Spam anda dan klik pautan pengesahan yang telah dihantar.
                        </p>
                        <hr />
                        <Link to='/sign-out' className='btn btn-outline-danger mt-3'>
                            <FontAwesomeIcon icon='fa-solid fa-sign-out-alt' className='me-2' />
                            Log Keluar
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return <Outlet />
}
export default ProtectedRoute