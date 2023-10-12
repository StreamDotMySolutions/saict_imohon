import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import States from './components/States'
import { React, useState , useEffect} from 'react'
import axios from '../../libs/axios'
import UserTable from './components/UserTable';


const Index = () => {

    return (
    <Container className="mt-3 mb-3">
      <UserTable />
    </Container>
    )
} 


export default Index