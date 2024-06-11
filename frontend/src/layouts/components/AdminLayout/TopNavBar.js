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
                <Nav.Link as={NavLink} to="/"> <FontAwesomeIcon icon="fa-solid fa-home" />{' '}Home</Nav.Link>
                <Nav.Link as={NavLink} to="/users"> <FontAwesomeIcon icon="fa-solid fa-user" />{' '}Users</Nav.Link>
              
                <Nav.Link as={NavLink} to="/mohon-approval/by-admin"> <FontAwesomeIcon icon="fa-solid fa-pencil" />{' '}Mohon</Nav.Link>
                <Nav.Link as={NavLink} to="/inventories"> <FontAwesomeIcon icon="fa-solid fa-computer" />{' '}Inventori</Nav.Link>
                {/* <Nav.Link as={NavLink} to="/distributions"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Agihan</Nav.Link> */}
                
                <Dropdown>
                  <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <FontAwesomeIcon icon="fa-solid fa-person" />{' '}Pengurusan
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* <Dropdown.Item href="#/action-1">Permohonan</Dropdown.Item> */}
                    <Nav.Link as={NavLink} to="/administration/mohon"> <FontAwesomeIcon icon="fa-solid fa-pencil" />{' '}Mohon</Nav.Link>
                    <Nav.Link as={NavLink} to="/agihan-2"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Agihan</Nav.Link> 
                    <Nav.Link as={NavLink} to="/manage/mohon-distribution-requests"> <FontAwesomeIcon icon="fa-solid fa-truck" />{' '}Distribution</Nav.Link> 
                  </Dropdown.Menu>
               </Dropdown>
              </Nav>
           <Account />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default TopNavbar;