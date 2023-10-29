import React from 'react'
import useApplicationStore from '../../stores/ApplicationStore'
import { Form, InputGroup, Tab, Tabs } from 'react-bootstrap'
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
        
        <Tabs
            defaultActiveKey={'description-tab'}
            className='mb-3'
            onSelect={HandleTabChange}
        >

            <Tab eventKey={'description-tab'} title='Tujuan'>
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

    );
};

export default ApplicationForm;