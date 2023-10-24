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

    const HandleTabChange = (key) => {
      //console.log(key)

      // set role store
      useUserStore.setState({ selectedRole : key })
    }

    return (
      <Tabs
        defaultActiveKey="approve"
        id="userTab"
        className="mb-3"
        onSelect={HandleTabChange}
      >
        <Tab eventKey="approve" title="Pendaftaran Baharu">
          <NewRegistration role='user'/>
        </Tab>

        <Tab eventKey="user" title="Pengguna">
          <UserTable role='user'/>
        </Tab>
        <Tab eventKey="admin" title="Admin">
          <UserTable role='admin'/>
        </Tab>
        <Tab eventKey="approver-1" title="Pelulus 1">
          <UserTable role='approver-1'/>
        </Tab>
        <Tab eventKey="approver-2" title="Pelulus 2">
          <UserTable role='approver-2'/>
        </Tab>  
      </Tabs>

    )
} 


export default User