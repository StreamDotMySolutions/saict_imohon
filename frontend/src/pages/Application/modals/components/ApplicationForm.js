import React from 'react'
import useApplicationStore from '../../stores/ApplicationStore'
import { Row, Form, InputGroup, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DescriptionTab from './components/DescriptionTab';
import ItemTab from './components/ItemTab';

const ApplicationForm = () => {

    const store = useApplicationStore()
    
     
    const HandleTabChange = (key) => {
        console.log(key)
    }
  
    return (
        
        <Row className='p-2'>
        <Tabs
            defaultActiveKey={'description-tab'}
            className='mb-3'
            onSelect={HandleTabChange}
        >

            <Tab eventKey={'description-tab'} title='Maklumat'>
                <DescriptionTab />
            </Tab>

            <Tab eventKey={'item-pc-tab'} title='PC'>
                <ItemTab fieldName={'pc'} />
            </Tab>

            <Tab eventKey={'item-nb-tab'} title='NB'>
                <ItemTab fieldName={'nb'} />
            </Tab>

            <Tab eventKey={'item-pbwn-tab'} title='PBWN'>
                <ItemTab fieldName={'pbwn'} />
            </Tab>

            <Tab eventKey={'item-pcn-tab'} title='PCN'>
                <ItemTab fieldName={'pcn'} />
            </Tab>

            <Tab eventKey={'item-projektor-tab'} title='Projektor'>
                <ItemTab fieldName={'projektor'} />
            </Tab>

            <Tab eventKey={'item-webcam-tab'} title='Webcam'>
                <ItemTab fieldName={'webcam'} />
            </Tab>

        </Tabs>
        </Row>

    );
};

export default ApplicationForm;