import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './img/imohon.png'
import HandleLogout from '../../../libs/HandleLogout';
import { useAuthStore } from '../../../stores/AuthStore';

function TopNavbar() {

  
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
    <Navbar fixed="top"  bg="light" data-bs-theme="light">
      <Container className="justify-content-center">
        <Navbar.Brand as={NavLink} to="/"><img style={{ 'width':'125px' }}  src={Logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        <Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/"> <FontAwesomeIcon icon="fa-solid fa-home" />{' '}Home</Nav.Link>
    
            <Nav.Link as={NavLink} to="/users"> <FontAwesomeIcon icon="fa-solid fa-user" />{' '}Users</Nav.Link>
            <Nav.Link as={NavLink} to="/user-departments"> <FontAwesomeIcon icon="fa-solid fa-users" />{' '}Department</Nav.Link>
            
            <Nav.Link as={NavLink} to="/categories"> <FontAwesomeIcon icon="fa-solid fa-list" />{' '}Category</Nav.Link>
          </Nav>

        </Nav>
          <Nav className="ms-auto">

            <Nav>
              <Nav.Link as={NavLink} to="/" onClick={handleLogoutClick} className='active'>Logout{' '}   <FontAwesomeIcon icon="fa-solid fa-sign-out" /></Nav.Link>
            </Nav>
            
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default TopNavbar;