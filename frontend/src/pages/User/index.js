import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { React, useState , useEffect} from 'react'
import axios from '../../libs/axios'
import UserTable from './components/UserTable';
import HeaderTable from './components/HeaderTable';
import { Tabs,Tab } from 'react-bootstrap';
import useUserStore from './stores/UserStore';

const User = () => {
    const store = useUserStore()
    console.log(store)
    return (
      <Tabs
        defaultActiveKey="admin"
        id="admin"
        className="mb-3"
      >
        <Tab eventKey="admin" title="Admin">
        {store.refresh ? 'true' : 'false'}
          <UserTable />
     
        </Tab>
        <Tab eventKey="Penyelaras" title="Penyelaras">
          <UserTable />
        </Tab>
        <Tab eventKey="Pengguna" title="Pengguna">
          <UserTable />
        </Tab>
      </Tabs>

    )
} 


export default User