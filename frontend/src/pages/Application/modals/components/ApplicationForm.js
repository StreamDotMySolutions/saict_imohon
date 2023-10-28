import React from 'react'
import useApplicationStore from '../../stores/ApplicationStore'
import { Form, InputGroup, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ItemTab from './components/ItemTab';
import DescriptionTab from './components/DescriptionTab';

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

            <Tab eventKey={'item-tab'} title='Peralatan'>
                <ItemTab />
            </Tab>

        </Tabs>

    );
};

export default ApplicationForm;