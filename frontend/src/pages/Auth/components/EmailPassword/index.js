import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Card, Alert } from 'react-bootstrap'
import axios from '../../../../libs/axios'

const EmailPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState(null)
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsError(false)
        setIsSuccess(false)
        setIsLoading(true)

        const formData = new FormData()
        formData.append('email', email)

        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/password/email`,
            method: 'post',
            data: formData
        })
            .then(response => {
                setIsSuccess(true)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                setIsError(true)
                if (error.response?.data === 'passwords.throttled') {
                    setMessage('Server sedang sibuk, sila tunggu dan cuba lagi.')
                } else {
                    setMessage(error.response?.data?.message || 'Ralat melayan server')
                }
            })
    }

    if (isSuccess) {
        return (
            <Container className='py-5' style={{ maxWidth: '450px' }}>
                <Card className='border-0 shadow-lg'>
                    <Card.Body className='p-3 p-sm-4 p-md-5'>
                        <div className='text-center mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-check-circle' className='text-success' style={{ fontSize: '2.5rem' }} />
                        </div>
                        <h4 className='fw-bold text-center mb-3 fs-4'>Pautan Dihantar</h4>
                        <Alert variant='success' className='mb-4'>
                            Pautan reset password telah berjaya dihantar. Sila periksa emel anda dan ikuti arahan di sana.
                        </Alert>
                        <div className='text-center'>
                            <Link to='/sign-in'>
                                <Button variant='primary'>
                                    <FontAwesomeIcon icon='fa-solid fa-arrow-right-to-bracket' className='me-2' />
                                    Kembali ke Log Masuk
                                </Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return (
        <Container className='py-5' style={{ maxWidth: '450px' }}>
            <Card className='border-0 shadow-lg'>
                <Card.Body className='p-3 p-sm-4 p-md-5'>
                    <div className='text-center mb-4'>
                        <h3 className='fw-bold mb-2 fs-4'>Lupa Kata Laluan</h3>
                        <p className='text-muted mb-0'>Masukkan emel anda untuk reset</p>
                    </div>

                    {isError && (
                        <Alert variant='danger' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-exclamation-circle' className='me-2' />
                            {message || 'Ralat melayan server'}
                        </Alert>
                    )}

                    {!isError && !isLoading && (
                        <Alert variant='info' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-info-circle' className='me-2' />
                            Sila masukkan alamat emel anda dan kami akan hantar pautan untuk reset kata laluan.
                        </Alert>
                    )}

                    {isLoading && (
                        <Alert variant='warning' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-sync' spin className='me-2' />
                            Sedang memproses...
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-4'>
                            <Form.Label className='fw-semibold'>
                                <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-2' />
                                Alamat Emel
                            </Form.Label>
                            <Form.Control
                                size='lg'
                                type='email'
                                name='email'
                                placeholder='nama@example.com'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                isInvalid={!!isError}
                                disabled={isLoading}
                                required
                            />
                            {isError && (
                                <Form.Control.Feedback type='invalid'>
                                    Sila semak alamat emel anda
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Button
                            type='submit'
                            size='lg'
                            className='w-100 fw-semibold mb-3'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon='fa-solid fa-sync' spin className='me-2' />
                                    Sedang memproses...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon='fa-solid fa-paper-plane' className='me-2' />
                                    Hantar Pautan
                                </>
                            )}
                        </Button>

                        <div className='text-center'>
                            <p className='text-muted fs-6 mb-0'>
                                Kembali ke{' '}
                                <Link to='/sign-in' className='fw-semibold'>
                                    Log Masuk
                                </Link>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default EmailPassword