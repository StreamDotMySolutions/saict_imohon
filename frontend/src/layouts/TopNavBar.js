import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation} from 'react-router-dom'
import Logo from './img/imohon.png'

function TopNavbar() {

  const location = useLocation();

  const flag = (stateName) => {
    return (
      <img src={'/img/flags/' + stateName + '.png' }  className="img-fluid" width="30px" />
      )
  }

  return (
    <Navbar fixed="top"  bg="light" data-bs-theme="light">
      <Container className="justify-content-center">
        <Navbar.Brand as={NavLink} to="/"><img style={{ 'width':'125px' }}  src={Logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav activeKey={location.pathname}>
              <Nav.Link as={NavLink} to="/" className='active'>Logout</Nav.Link>
            </Nav>
            
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default TopNavbar;