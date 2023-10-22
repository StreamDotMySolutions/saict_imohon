import React from 'react';
import { Container,Row,Col,Tab, Tabs, Card, Button } from 'react-bootstrap';
import Account from './components/Account';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUpForm = () => {
    return (
        
        <Container>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Account">
                <Card className='mt-3'>
                    <Card.Header>Maklumat Akaun</Card.Header>
                    <Card.Body className='p-3'><Account /></Card.Body>
                </Card>
            </Tab>
            <Tab eventKey={2} title="Profil">
                <Card className='mt-3'>
                    <Card.Header>Maklumat Profil</Card.Header>
                    <Card.Body className='p-3'>
                    
                    </Card.Body>
                </Card>
            </Tab>

            
            <Tab eventKey={3} title="Jabatan">
                <Card className='mt-3'>
                    <Card.Header>Maklumat Jabatan</Card.Header>
                    <Card.Body className='p-3'>
                        
                    </Card.Body>
                </Card>
            </Tab>
        </Tabs>
        <Row className='col-12 mt-3 text-center text-lg-start mt-4 pt-2'>
                    <Col>
                        <Button 
                            //disabled={isLoading}
                            //onClick={handleClickSubmit}
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