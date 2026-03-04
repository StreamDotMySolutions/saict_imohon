import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../stores/AuthStore'
import axios from '../../../../libs/axios'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignOut = () => {
    const navigate = useNavigate()
    const { isAuthenticated, logout } = useAuthStore()

    useEffect(() => {
        const performSignOut = async () => {
            localStorage.clear()
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`)
                localStorage.clear()
                logout()
                navigate('/sign-in-by-nric')
            } catch (error) {
                console.error('Error during logout:', error)
                navigate('/sign-in-by-nric')
            }
        }

        performSignOut()
    }, [logout, navigate])

    if (!isAuthenticated) {
        navigate('/sign-in-by-nric')
        return null
    }

    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <Row>
                <Col xs={12} className='text-center'>
                    <div className='mb-4'>
                        <Spinner animation='border' variant='primary' role='status' size='lg'>
                            <span className='visually-hidden'>Sedang keluar...</span>
                        </Spinner>
                    </div>
                    <h4 className='fw-bold mb-2'>Sedang Keluar</h4>
                    <p className='text-muted mb-1'>Terima kasih telah menggunakan sistem iMohon</p>
                    <small className='text-secondary'>Anda akan dihantar semula ke laman log masuk...</small>
                </Col>
            </Row>
        </Container>
    )
}

export default SignOut
