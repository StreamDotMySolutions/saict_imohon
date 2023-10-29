import React from 'react';
import { Row,ProgressBar,Col,Badge } from 'react-bootstrap';

const ApplicationProgress = ({status, step}) => {
    return (
        <div>
             <Row>
                    <Col className='mt-3'>
                    { status === 'pending' && step === 1 &&

                        <>
                        <ProgressBar  variant={'warning'} style={{ 'height': '5px' }} now={25} />
                        <span className='text-muted fs-6'><Badge className='bg-warning'>STATUS</Badge>{' '}-{' '}menunggu pengesahan Ketua Jabatan</span>
                        </>
                    }

                    { status === 'pending' && step === 2 &&

                    <>
                    <ProgressBar  variant={'warning'} style={{ 'height': '5px' }} now={75} />
                    <span className='text-muted fs-6'><Badge className='bg-warning'>STATUS</Badge>{' '}-{' '}menunggu pengesahan Penyelaras</span>
                    </>
                    }

                 

                    { status === 'rejected' && step === 1 &&

                      <>
                      <ProgressBar  variant={'danger'} style={{ 'height': '5px' }} now={25} />
                      <span className='text-muted fs-6'><Badge className='bg-danger'>STATUS</Badge>{' '}-{' '}permohonan ditolak oleh Ketua Jabatan</span>
                      </>
                    }

                    { status === 'rejected' && step === 2 &&

                    <>
                    <ProgressBar  variant={'danger'} style={{ 'height': '5px' }} now={100} />
                    <span className='text-muted fs-6'><Badge className='bg-danger'>STATUS</Badge>{' '}-{' '}permohonan ditolak oleh Penyelaras</span>
                    </>
                    }

                    
                    { status === 'approved' && step === 1 &&

                    <>
                    <ProgressBar  variant={'warning'} style={{ 'height': '5px' }} now={75} />
                    <span className='text-muted fs-6'><Badge className='bg-warning'>STATUS</Badge>{' '}-{' '}Permohonan diluluskan oleh Ketua Jabatan, sedang menunggu kelulusan dari Penyelaras</span>
                    </>
                    }

                    { status === 'approved' && step === 2 &&

                    <>
                    <ProgressBar  variant={'success'} style={{ 'height': '5px' }} now={100} />
                    <span className='text-muted fs-6'><Badge className='bg-success'>STATUS</Badge>{' '}-{' '}Permohonan diluluskan oleh Penyelaras</span>
                    </>
                    }
                    </Col>
                </Row>
        </div>
    );
};

export default ApplicationProgress;