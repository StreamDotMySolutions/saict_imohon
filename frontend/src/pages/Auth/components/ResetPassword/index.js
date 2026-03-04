import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button, Container, Card, Alert } from 'react-bootstrap'
import axios from '../../../../libs/axios'

const ResetPassword = () => {
    const { token } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState({})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsError(false)
        setIsSuccess(false)
        setIsLoading(true)
        setErrors({})

        const formData = new FormData()
        formData.append('token', token)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('password_confirmation', passwordConfirmation)

        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/password/reset`,
            method: 'post',
            data: formData
        })
            .then(response => {
                setIsSuccess(true)
                setIsLoading(false)
            })
            .catch(error => {
                setIsError(true)
                setIsLoading(false)

                if (error.response?.status === 422) {
                    if (error.response.data.message) {
                        setMessage(error.response.data.message)
                    }
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors)
                    }
                } else {
                    setMessage(error.message || 'Ralat melayan server')
                }
            })
    }

    if (isSuccess) {
        return (
            <Container className='py-5' style={{ maxWidth: '450px' }}>
                <Card className='border-0 shadow-lg'>
                    <Card.Body className='p-5'>
                        <div className='text-center mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-check-circle' className='text-success' style={{ fontSize: '2.5rem' }} />
                        </div>
                        <h4 className='fw-bold text-center mb-3 fs-4'>Kata Laluan Direset</h4>
                        <Alert variant='success' className='mb-4'>
                            Kata laluan anda telah berjaya direset. Sila log masuk dengan kata laluan baharu anda.
                        </Alert>
                        <div className='text-center'>
                            <Link to='/sign-in'>
                                <Button variant='primary'>
                                    <FontAwesomeIcon icon='fa-solid fa-arrow-right-to-bracket' className='me-2' />
                                    Log Masuk
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
                <Card.Body className='p-5'>
                    <div className='text-center mb-4'>
                        <h3 className='fw-bold mb-2 fs-4'>Reset Kata Laluan</h3>
                        <p className='text-muted mb-0'>Masukkan kata laluan baharu anda</p>
                    </div>

                    {isError && (
                        <Alert variant='danger' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-exclamation-circle' className='me-2' />
                            {message || 'Input anda mempunyai ralat'}
                        </Alert>
                    )}

                    {!isError && !isLoading && (
                        <Alert variant='info' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-info-circle' className='me-2' />
                            Sila lengkapkan kata laluan baharu anda. Minimum 6 aksara.
                        </Alert>
                    )}

                    {isLoading && (
                        <Alert variant='warning' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-sync' spin className='me-2' />
                            Sedang memproses...
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
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
                                isInvalid={!!errors.email}
                                disabled={isLoading}
                                required
                            />
                            {errors.email && (
                                <Form.Control.Feedback type='invalid'>
                                    {errors.email}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label className='fw-semibold'>
                                <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2' />
                                Kata Laluan Baharu
                            </Form.Label>
                            <Form.Control
                                size='lg'
                                type='password'
                                name='password'
                                placeholder='Masukkan kata laluan baharu'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                                disabled={isLoading}
                                required
                            />
                            {errors.password && (
                                <Form.Control.Feedback type='invalid'>
                                    {errors.password}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label className='fw-semibold'>
                                <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2' />
                                Sahkan Kata Laluan
                            </Form.Label>
                            <Form.Control
                                size='lg'
                                type='password'
                                name='password_confirmation'
                                placeholder='Sahkan kata laluan anda'
                                value={passwordConfirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                                isInvalid={!!errors.password_confirmation}
                                disabled={isLoading}
                                required
                            />
                            {errors.password_confirmation && (
                                <Form.Control.Feedback type='invalid'>
                                    {errors.password_confirmation}
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
                                    <FontAwesomeIcon icon='fa-solid fa-key' className='me-2' />
                                    Reset Kata Laluan
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

export default ResetPassword