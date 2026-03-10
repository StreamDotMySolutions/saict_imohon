import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './img/imohon.png'
import Account from '../Account';

function TopNavbar() {

  return (
    <Navbar fixed="top"  bg="light" data-bs-theme="light">
      <Container className="justify-content-center">
        <Navbar.Brand as={NavLink} to="/"><img style={{ 'width':'125px' }}  src={Logo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link as={NavLink} to="/"> <FontAwesomeIcon icon="fa-solid fa-home" />{' '}Utama</Nav.Link>
              </Nav>

              <Dropdown>
                <Dropdown.Toggle variant="default" id="dropdown-mohon">
                  <FontAwesomeIcon icon="fa-solid fa-file-pen" />{' '}Mohon
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Nav.Link as={NavLink} to="/mohon"> <FontAwesomeIcon icon="fa-solid fa-list" />{' '}Senarai</Nav.Link>
                  <Nav.Link as={NavLink} to="/item-request"> <FontAwesomeIcon icon="fa-solid fa-plus" />{' '}Mohon Baru</Nav.Link>
                </Dropdown.Menu>
              </Dropdown>

              <Nav>
                <Nav.Link as={NavLink} to="/user/requested-items"> <FontAwesomeIcon icon="fa-solid fa-computer" />{' '}Peralatan</Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link as={NavLink} to="/user/agihan"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Agihan</Nav.Link>
              </Nav>

              <Nav>
                <Nav.Link as={NavLink} to="/user/tracking"> <FontAwesomeIcon icon="fa-solid fa-timeline" />{' '}Penjejakan</Nav.Link>
              </Nav>

           <Account />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;