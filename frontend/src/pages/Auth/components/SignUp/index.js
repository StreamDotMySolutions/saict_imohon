import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Tab, Tabs, Card, Button, Alert } from 'react-bootstrap';
import Account from './components/Account';
import Profile from './components/Profile';
import Department from './components/Department';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthStore from '../../stores/AuthStore';
import axios from 'axios';

const SignUpForm = () => {

    const store = useAuthStore();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Fields to be reset
    const fields = [
        'email',
        'password',
        'password_confirmation',
        'name',
        'occupation',
        'nric',
        'phone',
        'level',
        'building',
        'address',
        'user_department_id',
    ];

    // Reset fields when the component is mounted
    useEffect(() => {
        fields.forEach(field => {
            useAuthStore.setState({ [field]: { value: null } });
        });
    }, []);

    const handleClickSubmit = () => {
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(true);
        useAuthStore.setState({ errors: null }); // reset error

        const formData = new FormData();

        fields.forEach(fieldName => {
            if (store && store[fieldName]?.value) {
                formData.append(fieldName, store[fieldName].value);
            }
        });

        axios({
            url: store.store_url,
            method: 'post',
            data: formData
        })
        .then(response => {
            setIsSuccess(true);
            setIsLoading(false);

            // reset the store value
            fields.forEach(field => {
                useAuthStore.setState({ [field]: { value: null } });
            });

        })
        .catch(error => {
            setIsLoading(false);
            if (error.response?.status === 422) {
                setIsError(true);
                useAuthStore.setState({ errors: error.response.data.errors });
            }
        });
    };

    if (isSuccess) {
        return (
            <Alert variant='success'>
                Pendaftaran berjaya. Pihak admin akan mengesahkan pendaftaran anda.
                Sila periksa emel untuk notifikasi pengesahan akaun.
                <hr />
                <Link to='/sign-in'>
                    <FontAwesomeIcon icon="fa-solid fa-reply" /> Laman utama
                </Link>
            </Alert>
        );
    }

    return (
        <Container className='mb-5'>
            {isError && 
                <Alert variant='danger'>
                    Pendaftaran gagal.         
                </Alert>
            }

            <Account />
            <br />
            <Profile />
            <br />
            <Department />

            <Row className='col-12 mt-3 text-center text-lg-start mt-4 pt-2 d-flex justify-content-center'>
                <Col className='col-6'>
                    <button onClick={handleClickSubmit} type="submit" className="btn btn-primary btn-lg login-button">
                        {isLoading ? 
                        <>
                            <i className="fa-solid fa-sync fa-spin"></i>
                        </>
                        :
                        <>
                            Daftar
                        </>
                        }
                    </button>
                    {' '}
                    <Link onClick={() => useAuthStore.setState({ errors: null })} to='/sign-in'>
                        <FontAwesomeIcon className='ms-4' icon="fa-solid fa-reply" /> Log Masuk
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
