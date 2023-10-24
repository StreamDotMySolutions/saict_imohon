import {Container, Tabs, Tab } from 'react-bootstrap';
import UserDepartment from './components/UserDepartment';
import UserAccount from './components/UserAccount';
import UserProfile from './components/UserProfile';

function UserForm() {

    return (
      <Container>

      <Tabs
        defaultActiveKey="user"
        id="UserTab"
        className="mb-3"
      >
        <Tab eventKey="user" title="Akaun">
          <UserAccount />
        </Tab>
        <Tab eventKey="profile" title="Profil" >
          <UserProfile />
        </Tab>
        <Tab eventKey="department" title="Jabatan" >
          <UserDepartment /> 
        </Tab>
      </Tabs>
          
      </Container>
    );
}

export default UserForm;

