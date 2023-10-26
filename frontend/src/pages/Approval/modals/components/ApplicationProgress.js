import React from 'react';
import { Row,ProgressBar,Col,Badge } from 'react-bootstrap';

const ApplicationProgress = ({status}) => {
    return (
        <div>
             <Row>
                    <Col className='mt-3'>
                    { status === 'pending' && 

                        <>
                        <ProgressBar  variant={'warning'} style={{ 'height': '5px' }} now={25} />
                        <span className='text-muted fs-6'><Badge className='bg-warning'>STATUS</Badge>{' '}-{' '}menunggu pengesahan Ketua Jabatan</span>
                        </>
                    }
                 
                    { status === 'approved' && 

                        <>
                        <ProgressBar  variant={'success'} style={{ 'height': '5px' }} now={50} />
                        <span className='text-muted fs-6'><Badge className='bg-success'>STATUS</Badge>{' '}-{' '}menunggu pengesahan Penyelaras</span>
                        </>
                    }

                    { status === 'rejected' && 

                      <>
                      <ProgressBar  variant={'danger'} style={{ 'height': '5px' }} now={100} />
                      <span className='text-muted fs-6'><Badge className='bg-danger'>STATUS</Badge>{' '}-{' '}permohonan ditolak oleh Ketua Jabatan</span>
                      </>
                    }
                    </Col>
                </Row>
        </div>
    );
};

export default ApplicationProgress;