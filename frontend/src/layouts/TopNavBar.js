import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './img/imohon.png'

function TopNavbar() {


  return (
    <Navbar fixed="top"  bg="light" data-bs-theme="light">
      <Container className="justify-content-center">
        <Navbar.Brand as={NavLink} to="/"><img style={{ 'width':'125px' }}  src={Logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav>
              <Nav.Link as={NavLink} to="/" className='active'>Logout{' '}   <FontAwesomeIcon icon="fa-solid fa-sign-out" /></Nav.Link>
            </Nav>
            
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default TopNavbar;