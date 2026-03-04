import React, { useState, useEffect } from 'react'
import { Form, Container, Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuthStore from '../../stores/AuthStore'
import axios from '../../../../libs/axios'
import Account from './components/Account'
import Profile from './components/Profile'
import Department from './components/Department'

const SignUpForm = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const store = useAuthStore()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fields = [
        'email',
        'password',
        'password_confirmation',
        'name',
        'occupation',
        'nric',
        'phone',
        'level',
        'building',
        'address',
        'user_department_id',
    ]

    useEffect(() => {
        fields.forEach(field => {
            useAuthStore.setState({ [field]: { value: null } })
        })
    }, [])

    const handleClickSubmit = () => {
        setIsError(false)
        setIsSuccess(false)
        setIsLoading(true)
        useAuthStore.setState({ errors: null })

        const formData = new FormData()

        fields.forEach(fieldName => {
            if (store && store[fieldName]?.value) {
                formData.append(fieldName, store[fieldName].value)
            }
        })

        axios({
            url: `${apiUrl}/register`,
            method: 'post',
            data: formData
        })
            .then(response => {
                setIsSuccess(true)
                setIsLoading(false)
                fields.forEach(field => {
                    useAuthStore.setState({ [field]: { value: null } })
                })
            })
            .catch(error => {
                setIsLoading(false)
                if (error.response?.status === 422) {
                    setIsError(true)
                    useAuthStore.setState({ errors: error.response.data.errors })
                } else {
                    setIsError(true)
                }
            })
    }

    if (isSuccess) {
        return (
            <Container className='py-5' style={{ maxWidth: '600px' }}>
                <Card className='border-0 shadow-lg'>
                    <Card.Body className='p-5'>
                        <div className='text-center mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-check-circle' className='text-success' style={{ fontSize: '3rem' }} />
                        </div>
                        <h5 className='fw-bold text-center mb-3'>Pendaftaran Berjaya</h5>
                        <Alert variant='success' className='mb-4'>
                            Pihak admin akan mengesahkan pendaftaran anda.
                            <br />
                            Sila periksa emel untuk notifikasi pengesahan akaun.
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
        <Container className='py-5' style={{ maxWidth: '600px' }}>
            <Card className='border-0 shadow-lg'>
                <Card.Body className='p-5'>
                    <div className='text-center mb-4'>
                        <h3 className='fw-bold mb-1'>Daftar</h3>
                        <p className='text-muted'>Buat akaun baru untuk memulakan</p>
                    </div>

                    {isError && (
                        <Alert variant='danger' className='mb-4'>
                            <FontAwesomeIcon icon='fa-solid fa-exclamation-circle' className='me-2' />
                            Pendaftaran gagal. Sila semak maklumat anda dan cuba lagi.
                        </Alert>
                    )}

                    <Form>
                        <Account />
                        <hr />
                        <Profile />
                        <hr />
                        <Department />

                        <Button
                            type='button'
                            size='lg'
                            className='w-100 fw-semibold mt-4 mb-3'
                            onClick={handleClickSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon='fa-solid fa-sync' spin className='me-2' />
                                    Sedang memproses...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon='fa-solid fa-user-plus' className='me-2' />
                                    Daftar
                                </>
                            )}
                        </Button>

                        <div className='text-center'>
                            <p className='text-muted'>
                                Sudah ada akaun?{' '}
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

export default SignUpForm
