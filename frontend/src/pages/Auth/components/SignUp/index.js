import React, { useState } from 'react';
import {Form, Container,Row,Col,Tab, Tabs, Card, Button, Alert } from 'react-bootstrap';
import Account from './components/Account';
import Profile from './components/Profile';
import Department from './components/Department';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthStore from '../../stores/AuthStore';
import axios from 'axios';

const SignUpForm = () => {

    const store = useAuthStore() 
    const [isSuccess,setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    
    const handleClickSubmit = () => {

        setIsError(false)
        setIsSuccess(false)
        setIsLoading(true)
        useAuthStore.setState({ errors: null}) // reset error
        //console.log(store)

        const formData = new FormData()

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
            console.log(response)
            setIsSuccess(true)
            setIsLoading(false)

            // reset the store value
            fields.forEach((field) => {
                useAuthStore.setState({ [field]: { value: null } });
            });
 
        })
        .catch(error => {
            setIsLoading(false)
            if( error.response?.status == 422 ){
                setIsError(true)
                //console.log('422')
                useAuthStore.setState({ errors:error.response.data.errors  })
            }
        })
    }

    if(isSuccess){
        return (
            <Alert variant='success'>
                Pendaftaran berjaya. Pihak admin akan mengesahkan pendaftaran anda.
                Sila periksa emel untuk notifikasi pengesahan akaun.
                <hr />
                <Link to='/sign-in'>
                    <FontAwesomeIcon icon="fa-solid fa-reply" /> Laman utama
                </Link>
            </Alert>

        )
    }


    return (
        
        <Container>

            { isError && 
                <Alert variant='danger'>
                    Pendaftaran gagal. Sila periksa borang di kesemua tab.         
                </Alert>
            }

            <Tabs 
                className="mb-1"
                defaultActiveKey={1} 
                id="uncontrolled-tab-example"
            >
                <Tab eventKey={1} title="Akaun">

                <Col className='border border-top-0 p-4'>
                    <Account />
                </Col>
                    
                    {/* <Card className='mt-3'>
                        <Card.Header>Maklumat Akaun</Card.Header>
                        <Card.Body className='p-3'><Account /></Card.Body>
                    </Card> */}
                </Tab>
                <Tab eventKey={2} title="Profil">

                <Col className='border border-top-0 p-3'>
                    <Profile />
                </Col>
                    {/* <Card className='mt-3'>
                        <Card.Header>Maklumat Profil</Card.Header>
                        <Card.Body className='p-3'>
                        
                        </Card.Body>
                    </Card> */}
                </Tab>

                
                <Tab eventKey={3} title="Jabatan">
                    <Col className='border border-top-0 p-3'>
                        <Department />
                    </Col>
                    {/* <Card className='mt-3'>
                        <Card.Header>Maklumat Jabatan</Card.Header>
                        <Card.Body className='p-3'>
                            
                        </Card.Body>
                    </Card> */}
                </Tab>
            </Tabs>
        
            <Row className='col-12 mt-3 text-center text-lg-start mt-4 pt-2 d-flex justify-content-center'>
                    <Col className='col-6'>
                    <button onClick={handleClickSubmit} type="submit" className="btn btn-primary btn-lg login-button">
                    { isLoading ? 
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
                        <Link onClick={ () =>  useAuthStore.setState({ errors: null}) } to='/sign-in'>
                            <FontAwesomeIcon className='ms-4' icon="fa-solid fa-reply" /> Log Masuk
                        </Link>

                    </Col>
                        

            
            </Row>

        </Container>
        
    );
};

export default SignUpForm;