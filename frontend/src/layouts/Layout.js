import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthStore from '../pages/Auth/stores/AuthStore';
import DefaultLayout from './components/DefaultLayout';
import AdminLayout from './components/AdminLayout';
import UserLayout from './components/UserLayout';
import ManagerLayout from './components/ManagerLayout';
import BossLayout from './components/BossLayout';
import SystemLayout from './components/SystemLayout';

const Layout = () => {
    const store = useAuthStore();
    //console.log(store)

    if(!store?.user?.role)  return <DefaultLayout />

    // Block access if email not verified — show full-page notification
    if (!store?.user?.email_verified_at) {
        return (
            <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
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
                            {store.user.email}
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

    let renderedComponent;

    switch (store.user.role) {
        case 'system':
            renderedComponent = <SystemLayout />;
        break;

        case 'admin':
            renderedComponent = <AdminLayout />;
        break;

        case 'user':
                renderedComponent = <UserLayout />;
        break;

        case 'manager':
            renderedComponent = <ManagerLayout />;
        break;

        case 'boss':
            renderedComponent = <BossLayout />;
        break;

        default:
            // Render a fallback or handle other cases here
            renderedComponent = <div>Hello world</div>;
    }

    return (
        <div>
            {renderedComponent}
        </div>
    );
};

export default Layout;
