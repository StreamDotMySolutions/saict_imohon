import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerifySuccess = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <Card className='border-0 shadow text-center' style={{ maxWidth: 480 }}>
                <Card.Body className='py-5 px-4'>
                    <div
                        className='d-flex align-items-center justify-content-center mx-auto mb-4'
                        style={{
                            width: 80, height: 80, borderRadius: '50%',
                            backgroundColor: '#d1fae5',
                        }}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-check' style={{ fontSize: '2rem', color: '#059669' }} />
                    </div>
                    <h4 className='fw-bold mb-2'>Email Berjaya Disahkan</h4>
                    <p className='text-muted mb-4'>
                        Email anda telah berjaya disahkan. Sila tunggu pengesahan daripada pentadbir sistem untuk mengaktifkan akaun anda.
                    </p>
                    <Link to='/sign-in-by-nric' className='btn btn-success px-4'>
                        <FontAwesomeIcon icon='fa-solid fa-right-to-bracket' className='me-2' />
                        Log Masuk
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default VerifySuccess
