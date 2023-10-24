import React from 'react'
import { Row,Col, Button, ProgressBar,Modal } from 'react-bootstrap'
import CreateModal from './modals/CreateModal'
import ShowModal from './modals/ShowModal'
import EditModal from './modals/EditModal'

const Application = () => {
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
            <Row className='border border-1 rounded p-3 mt-2'>
                <Col className='col-1'>1</Col>
                <Col>Untuk pegawai baharu</Col>
                <Col>24/10/23</Col>
                <Col>Baharu</Col>
                <Col className='text-center'><ShowModal />{' '}<EditModal /></Col>
                <Row>
                    <Col className='mt-3'>
                        <ProgressBar animated variant={'primary'} style={{'height':'25px'}} now={75} label={'Menunggu kelulusan dari Penyelaras'} />
                    </Col>
                </Row>
            </Row>
        </div>
    );
};

export default Application;