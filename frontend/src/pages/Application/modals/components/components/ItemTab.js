import { Badge,Button,Row,Col,Form } from 'react-bootstrap'
import { Item,Description ,Type, ItemDetail} from './components/Input'
import { React, useState } from 'react';
import useApplicationStore from '../../../stores/ApplicationStore';

const ItemPCTab = ({fieldName}) => {
    return (
        <div>

            <Row className='mt-4 mb-3'>
               
                <Col className='col-3'>
                    <Item item={fieldName} />
                </Col>

                <Col>
                    {/* <Type item={fieldName} /> */}
                </Col>
            </Row>

            {/* <Row className='mt-4 mb-3'>
                <Description item={fieldName} />
            </Row> */}
            <hr />
            <h3>Maklumat lanjut</h3>
            <ItemDetail item={fieldName}/>
        </div>
    );
};

export default ItemPCTab;