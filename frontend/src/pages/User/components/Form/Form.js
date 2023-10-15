import React, { useState } from 'react';
import { Form, FormControl, Button, Container, Tabs, Tab } from 'react-bootstrap';
import useUserStore from '../../stores/UserStore'; 
import UserDepartment from './components/UserDepartment';
import UserAccount from './components/UserAccount';
import { InputText } from './components/include';
import UserProfile from './components/UserProfile';

function UserForm() {
    const user = useUserStore()
    
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

