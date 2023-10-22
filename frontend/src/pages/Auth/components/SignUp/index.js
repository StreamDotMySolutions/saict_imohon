import React from 'react';
import { Container,Row,Col,Tab, Tabs, Card, Button } from 'react-bootstrap';
import Account from './components/Account';
import Profile from './components/Profile';
import Department from './components/Department';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuthStore from '../../stores/AuthStore';
import axios from 'axios';

const SignUpForm = () => {

    const store = useAuthStore()

    const handleClickSubmit = () => {
       
        const formData = new FormData()
        if( store && store.email?.value ){
            console.log(store.email?.value)
            formData.append('email', store.email.value)
        }

        axios({
            url: store.store_url,
            method: 'post',
            data: formData
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.warn(error)
            if( error.response.status == 422){
                console.log('422 errors')
            }
        })
    }

    return (
        
        <Container>
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
        <Row className='col-12 mt-3 text-center text-lg-start mt-4 pt-2'>
            <Col>
                <Button 
                    //disabled={isLoading}
                    onClick={handleClickSubmit}
                    size='lg' 
                    className='login-button'>Daftar</Button>
                <span className='fs-6 ms-4'>
                    <Link to='/sign-in'><FontAwesomeIcon icon="fa-solid fa-reply"></FontAwesomeIcon>{' '}Log Masuk</Link>
                </span>
            </Col>
        </Row>
     
        </Container>
        
    );
};

export default SignUpForm;