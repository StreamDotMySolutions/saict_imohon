import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to '/sign-in-by-nric' after 3 seconds (optional)
        const timer = setTimeout(() => {
            navigate('/sign-in-by-nric');
        }, 1000);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, [navigate]);


    return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <Row>
                <Col xs={12} className='text-center'>
                    <div className='mb-4'>
                        <Spinner animation='border' variant='primary' role='status' size='lg'>
                            <span className='visually-hidden'>Sedang keluar...</span>
                        </Spinner>
                    </div>
                    <h4 className='fw-bold mb-2'>Sedang Keluar</h4>
                    <p className='text-muted mb-1'>Terima kasih telah menggunakan sistem iMohon</p>
                    <small className='text-secondary'>Anda akan dihantar semula ke laman log masuk...</small>
                </Col>
            </Row>
        </Container>
    );
};

export default Unauthorized;