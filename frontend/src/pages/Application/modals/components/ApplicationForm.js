import React from 'react'
import useApplicationStore from '../../stores/ApplicationStore'
import { Row, Form, InputGroup, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ItemTab from './components/ItemTab.js.bckp.1';
import DescriptionTab from './components/DescriptionTab';
import ItemPCTab from './components/ItemTab';

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
                <ItemPCTab fieldName={'pc'} />
            </Tab>

            <Tab eventKey={'item-nb-tab'} title='NB'>
                <ItemPCTab fieldName={'nb'} />
            </Tab>

            <Tab eventKey={'item-pbwn-tab'} title='PBWN'>
                <ItemPCTab fieldName={'pbwn'} />
            </Tab>

            <Tab eventKey={'item-pcn-tab'} title='PCN'>
                <ItemPCTab fieldName={'pcn'} />
            </Tab>

        </Tabs>
        </Row>

    );
};

export default ApplicationForm;