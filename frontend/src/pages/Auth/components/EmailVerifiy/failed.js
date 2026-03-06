import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerifyFailed = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
            <Card className='border-0 shadow text-center' style={{ maxWidth: 480 }}>
                <Card.Body className='py-5 px-4'>
                    <div
                        className='d-flex align-items-center justify-content-center mx-auto mb-4'
                        style={{
                            width: 80, height: 80, borderRadius: '50%',
                            backgroundColor: '#fee2e2',
                        }}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-xmark' style={{ fontSize: '2rem', color: '#dc2626' }} />
                    </div>
                    <h4 className='fw-bold mb-2'>Pengesahan Gagal</h4>
                    <p className='text-muted mb-4'>
                        Pautan pengesahan email tidak sah atau telah tamat tempoh. Sila cuba log masuk semula untuk mendapatkan pautan baharu.
                    </p>
                    <Link to='/sign-in' className='btn btn-danger px-4'>
                        <FontAwesomeIcon icon='fa-solid fa-right-to-bracket' className='me-2' />
                        Log Masuk
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default VerifyFailed
