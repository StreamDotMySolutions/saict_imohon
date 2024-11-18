import React from 'react'
import useInventoryStore from '../../stores/InventoryStore'
import { Row } from 'react-bootstrap'


const InventoryForm = () => {

    const store = useInventoryStore()

    return (
        
        <Row className='p-2'>
            Inventory form
        </Row>

    );
};

export default InventoryForm;