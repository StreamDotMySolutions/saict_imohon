import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { React, useState , useEffect} from 'react'
import axios from '../../libs/axios'
import UserTable from './components/UserTable';
import HeaderTable from './components/HeaderTable';
import { Tabs,Tab } from 'react-bootstrap';
import useUserStore from './stores/UserStore';
import NewRegistration from './components/NewRegistration';

const User = () => {
    const store = useUserStore()
    return (
      <Tabs
        defaultActiveKey="approve"
        id="userTab"
        className="mb-3"
      >
        <Tab eventKey="approve" title="New Registration">
          <NewRegistration role='user'/>
        </Tab>

        <Tab eventKey="user" title="User">
          <UserTable role='user'/>
        </Tab>
        <Tab eventKey="admin" title="Admin">
          <UserTable role='admin'/>
        </Tab>
  
      </Tabs>

    )
} 


export default User