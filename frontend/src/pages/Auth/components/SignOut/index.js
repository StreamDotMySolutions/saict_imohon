import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../stores/AuthStore'
import axios from '../../../../libs/axios'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignOut = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const performSignOut = async () => {
            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/logout`)
            } catch (error) {
                console.error('Error during logout:', error)
            } finally {
                localStorage.clear()
                useAuthStore.setState({ user: null, isAuthenticated: false })
                navigate('/sign-in-by-nric')
            }
        }

        performSignOut()
    }, [navigate])

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
