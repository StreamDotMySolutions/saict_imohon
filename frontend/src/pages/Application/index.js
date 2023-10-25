import {useEffect, useState } from 'react'
import axios from '../../libs/axios'
import { Row,Col, Button, ProgressBar,Modal, Badge } from 'react-bootstrap'
import CreateModal from './modals/CreateModal'
import ShowModal from './modals/ShowModal'
import EditModal from './modals/EditModal'
import useApplicationStore from './stores/ApplicationStore'

const Application = () => {
    const store = useApplicationStore()
    const [data, setData] = useState([])
    const applications = data?.data?.applications
 
    useEffect( () => {
        axios({url: store.url,})
        .then( response => {
          //console.log(response)    
          setData(response)  
          useApplicationStore.setState({ refresh: false})
        })
        .catch( error => {
          console.warn(error)
        })

        // Add a delay of 1 second before closing
        setTimeout(() => {
            useApplicationStore.setState({ latestId: null})
        }, 4000);
    
      },[store.refresh])

 

    return (
        <div>
            
            <div className="d-flex bd-highlight mb-3">
                <div className="ms-auto p-2 bd-highlight">
                    <CreateModal />
                </div>
            </div>
            
            <Row className='bg-light border border-1 rounded p-3'>
                <Col className='col-1 fw-bold'>Bil.</Col>
                <Col className='fw-bold'>Tujuan</Col>
                <Col className='fw-bold'>Tarikh</Col>
                <Col className='fw-bold'>Jenis</Col>
                <Col className='fw-bold text-center'>Tindakan</Col>

            </Row>
            <hr />
            {applications?.data?.map((application,index) => (
            <Row 
                key={index} 
                className='border border-1 rounded p-3 mt-2' 
                //style={{ backgroundColor: 'lightyellow' }}
                style={{
                    backgroundColor: store.latestId !== null && store.latestId === application.id ? 'lightyellow' : ''
                  }}
            >
                <Col className='col-1'><Badge className='bg-dark'>{application.id}</Badge></Col>
                <Col>{application.description}</Col>
                <Col>24/10/23</Col>
                <Col>Baharu</Col>
                <Col className='text-center'>
                <ShowModal />
                {' '}
                <EditModal />
                </Col>
                {/* <Row>
                    <Col className='mt-3'>
                        <ProgressBar animated variant={'primary'} style={{ 'height': '25px' }} now={75} label={'Menunggu kelulusan dari Penyelaras'} />
                    </Col>
                </Row> */}
            </Row>
            ))}


        </div>
    );
};

export default Application;