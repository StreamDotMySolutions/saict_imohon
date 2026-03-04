import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navigate, Link } from 'react-router-dom'
import { Button, Card, Container, Form, Row, Col, Alert } from 'react-bootstrap'
import useAuthStore from '../../stores/AuthStore'
import axios from '../../../../libs/axios'

const DEV_USERS = [
    { role: 'System',   nric: '800101011234', password: 'password' },
    { role: 'Admin',    nric: '800102021234', password: 'password' },
    { role: 'Manager',  nric: '800103031234', password: 'password' },
    { role: 'Boss',     nric: '800104041234', password: 'password' },
    { role: 'User',     nric: '800105051234', password: 'password' },
]

const SignInByNricForm = () => {
    const store = useAuthStore()
    const [nric, setNRIC] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleNRICChange = (event) => {
        const input = event.target.value
        const formatted = input
            .replace(/\D/g, '')
            .slice(0, 12)
            .replace(/(\d{6})(\d{2})(\d{4})/, '$1-$2-$3')
        setNRIC(formatted)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setMessage('')
        setErrors({})
        setIsLoading(true)

        const formData = new FormData(event.target)

        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/login-by-nric`,
            method: 'post',
            data: formData,
        })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                useAuthStore.setState({ user: response.data.user })
                useAuthStore.setState({ isAuthenticated: true })
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors || {})
                } else if (error.response?.status === 401) {
                    setMessage('No. Kad Pengenalan atau katalaluan salah')
                } else {
                    setMessage(error.message || 'Ralat melayan server')
                }
            })
    }

    if (store.isAuthenticated === true) {
        return <Navigate to='/' replace />
    }

    return (
        <Container className='py-5' style={{ maxWidth: '450px' }}>
            <Card className='border-0 shadow-lg'>
                <Card.Body className='p-5'>
                    <div className='text-center mb-4'>
                        <h3 className='fw-bold mb-1'>Log Masuk</h3>
                        <p className='text-muted'>Guna Kad Pengenalan Diri</p>
                    </div>

                    {message && (
                        <Alert variant='danger' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-exclamation-circle' className='me-2' />
                            {message}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label className='fw-semibold'>
                                <FontAwesomeIcon icon='fa-solid fa-id-card' className='me-2' />
                                No. Kad Pengenalan
                            </Form.Label>
                            <Form.Control
                                size='lg'
                                type='text'
                                name='nric'
                                placeholder='XXXXXX-XX-XXXX'
                                value={nric}
                                onChange={handleNRICChange}
                                isInvalid={!!errors.nric}
                                disabled={isLoading}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.nric}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-4'>
                            <Form.Label className='fw-semibold'>
                                <FontAwesomeIcon icon='fa-solid fa-lock' className='me-2' />
                                Katalaluan
                            </Form.Label>
                            <Form.Control
                                size='lg'
                                type='password'
                                name='password'
                                placeholder='Masukkan katalaluan anda'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                isInvalid={!!errors.password}
                                disabled={isLoading}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            type='submit'
                            size='lg'
                            className='w-100 fw-semibold mb-4'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon='fa-solid fa-sync' spin className='me-2' />
                                    Sedang memproses...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon='fa-solid fa-arrow-right-to-bracket' className='me-2' />
                                    Log Masuk
                                </>
                            )}
                        </Button>

                        <div className='d-flex gap-2 flex-wrap justify-content-center text-center' style={{ fontSize: '0.9rem' }}>
                            {process.env.REACT_APP_SHOW_CREDENTIALS === 'true' && (
                                <Link to='/sign-in'>
                                    <FontAwesomeIcon icon='fa-solid fa-envelope' className='me-1' />
                                    Emel
                                </Link>
                            )}
                            <Link to='/password/email'>
                                <FontAwesomeIcon icon='fa-solid fa-question' className='me-1' />
                                Lupa Katalaluan
                            </Link>
                            <Link to='/sign-up'>
                                <FontAwesomeIcon icon='fa-solid fa-user-plus' className='me-1' />
                                Daftar
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {process.env.REACT_APP_SHOW_CREDENTIALS === 'true' && (
                <Card className='mt-4 border-light bg-light'>
                    <Card.Body className='p-3'>
                        <small className='text-muted fw-semibold d-block mb-2'>
                            <FontAwesomeIcon icon='fa-solid fa-flask' className='me-1' />
                            DEV — Akaun Ujian
                        </small>
                        <div className='d-flex flex-wrap gap-2'>
                            {DEV_USERS.map(u => (
                                <Button
                                    key={u.role}
                                    variant='outline-secondary'
                                    size='sm'
                                    onClick={() => { setNRIC(u.nric); setPassword(u.password) }}
                                    disabled={isLoading}
                                >
                                    {u.role}
                                </Button>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default SignInByNricForm
