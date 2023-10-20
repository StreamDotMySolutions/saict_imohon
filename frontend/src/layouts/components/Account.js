import React from 'react';
import { Button,Nav,Row,Col,Badge } from 'react-bootstrap'
import { useAuthStore } from '../../stores/AuthStore';
import { NavLink, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HandleLogout from '../../libs/HandleLogout';

const Account = () => {
    const store = useAuthStore()

  
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn) // set state
    
    const currDate = {
        show : new Date().toLocaleString(),
    }
  
    const handleLogoutClick = () =>{
      console.log('loggging out')
        HandleLogout()
        setIsLoggedIn(false)  
    }

    
    return (
        <>
        <Nav className='ms-auto'>
            <Button variant="light border border-1 me-2">
                    Message <Badge bg="secondary">9</Badge>
                    <span className="visually-hidden">unread messages</span>
                </Button>
            
            <Nav.Link className='border border-1 ' as={NavLink} to="/categories"> <FontAwesomeIcon icon="fa-solid fa-lock" />{' '}Account</Nav.Link>
        </Nav>
            
        <Nav>
            {/* <Row>
                <Col xs={12}></Col>
                <Col className='text-center fs-6 text-muted text-uppercase'>
                <Badge className='p-2 text-dark border border-1'  bg="warning">
                    { store?.user?.role}
                </Badge>
                </Col>
            </Row> */}
            <Nav.Link as={NavLink} to="/" onClick={handleLogoutClick} className='active fs-4'> <FontAwesomeIcon icon="fa-solid fa-sign-out" /></Nav.Link>
        </Nav>
        </>
   
    );
};

export default Account;