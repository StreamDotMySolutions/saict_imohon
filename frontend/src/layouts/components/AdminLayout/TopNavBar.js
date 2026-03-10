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
                <Nav.Link as={NavLink} to="/admin/dashboard"> <FontAwesomeIcon icon="fa-solid fa-gauge" />{' '}Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/users"> <FontAwesomeIcon icon="fa-solid fa-user" />{' '}Pengguna</Nav.Link>

                <Dropdown>
                  <Dropdown.Toggle variant="default" id="dropdown-mohon">
                    <FontAwesomeIcon icon="fa-solid fa-file-pen" />{' '}Mohon
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Nav.Link as={NavLink} to="/mohon-approval/by-admin"> <FontAwesomeIcon icon="fa-solid fa-pencil" />{' '}Permohonan</Nav.Link>
                    <Nav.Link as={NavLink} to="/requested-items"> <FontAwesomeIcon icon="fa-solid fa-list" />{' '}Senarai Item</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/agihan"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Agihan</Nav.Link>
                    <Nav.Link as={NavLink} to="/admin/tracking"> <FontAwesomeIcon icon="fa-solid fa-timeline" />{' '}Penjejakan</Nav.Link>
                    <Dropdown.Divider />
                    <Dropdown.Header>Pengurusan</Dropdown.Header>
                    <Nav.Link as={NavLink} to="/administration/mohon"> <FontAwesomeIcon icon="fa-solid fa-pencil" />{' '}Mohon</Nav.Link>
                    <Nav.Link as={NavLink} to="/administration/agihan"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Agihan</Nav.Link>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link as={NavLink} to="/inventories"> <FontAwesomeIcon icon="fa-solid fa-computer" />{' '}Inventori</Nav.Link>
                {/* <Nav.Link as={NavLink} to="/distributions"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Agihan</Nav.Link> */}
              </Nav>
          <Account />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default TopNavbar;