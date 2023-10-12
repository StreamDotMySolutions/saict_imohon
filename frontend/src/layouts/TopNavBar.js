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
          
            <NavDropdown title="Negeri" id="basic-nav-dropdown">
              <NavDropdown.Item style={{width:'180px'}} as={NavLink} to="/selangor">{flag('selangor')} Selangor</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/pulau-pinang">{flag('pulau-pinang')} Pulau Pinang</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/negeri-sembilan">{flag('negeri-sembilan')} Negeri Sembilan</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/kedah">{flag('kedah')} Kedah</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/terengganu">{flag('terengganu')} Terengganu</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/kelantan">{flag('kelantan')} Kelantan</NavDropdown.Item>
            </NavDropdown>

            <Nav activeKey={location.pathname}>
              <Nav.Link as={NavLink} to="/dashboard" className='text-muted'>Dashboard</Nav.Link>
            </Nav>
            
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default TopNavbar;