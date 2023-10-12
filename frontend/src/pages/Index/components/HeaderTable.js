import React from 'react';
import {Button, Col, Row, Form} from 'react-bootstrap'

const HeaderTable = () => {
    return (

    <Row className='mb-3'>
        <Col xs={11}>
            <Row className='col-6'>
                <Col className='me-2' xs={1}><Button variant='light'>HQ</Button></Col>
                <Col xs={2}><Button variant='light' className='border border-2'>Negeri</Button></Col>
                <Col xs={4}>
                <Form.Select aria-label="Default select example">
                    <option >Pilih negeri</option>
                    <option value="1">Johor</option>
                    <option value="2">Pahang</option>
                    <option value="3">Melaka</option>
                </Form.Select>
                </Col>
            </Row>
        
        {' '}
        
        {' '}
    
        </Col>
        <Col>
            <Button>Create</Button>
        </Col>
    </Row>
            
    );
};

export default HeaderTable;