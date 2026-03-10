import React, { useEffect } from 'react'
import { Container, Tab, Tabs, Card, Row, Col, Spinner, Badge } from 'react-bootstrap'
import axios from '../../libs/axios'
import useAccountStore from './stores/AccountStore'
import AccountTab from './components/AccountTab'
import ProfileTab from './components/ProfileTab'
import DepartmentTab from './components/DepartmentTab'

const Account = () => {
    const store = useAccountStore()

    useEffect( () => fetchData(store), [])

    if (store?.account?.email == null) {
        return (
            <Container>
                <div className='text-center py-5'>
                    <Spinner animation='border' variant='secondary' />
                    <p className='text-muted mt-2 small'>Memuatkan...</p>
                </div>
            </Container>
        )
    }

    const account = store?.account
    const name = account?.name || 'User'
    const email = account?.email || ''
    const nric = account?.nric || ''

    // Generate initials for avatar
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <Container className='py-4'>
            <div className='mb-4'>
                <h4 className='mb-1'>Tetapan Akaun</h4>
                <p className='text-muted'>Urus maklumat dan profil akaun anda</p>
                <hr />
            </div>

            <Row className='g-4'>
                {/* Sidebar Profile Card */}
                <Col md={3}>
                    <Card className='border-0 shadow-sm text-center p-4'>
                        {/* Avatar Circle */}
                        <div
                            style={{
                                width: '72px',
                                height: '72px',
                                borderRadius: '50%',
                                backgroundColor: '#0d6efd',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                color: 'white',
                                fontSize: '28px',
                                fontWeight: 'bold'
                            }}
                        >
                            {initials}
                        </div>
                        <h6 className='mt-3 mb-0 fw-semibold'>{name}</h6>
                        <p className='text-muted small mb-3'>{email}</p>
                        <Badge bg='secondary'>{nric}</Badge>
                    </Card>
                </Col>

                {/* Tabs Card */}
                <Col md={9}>
                    <Card className='border-0 shadow-sm'>
                        <Card.Body className='p-4'>
                            <Tabs defaultActiveKey={1} id="account-tabs">
                                <Tab eventKey={1} title="Akaun">
                                    <AccountTab />
                                </Tab>
                                <Tab eventKey={2} title="Profil">
                                    <ProfileTab />
                                </Tab>
                                <Tab eventKey={3} title="Jabatan">
                                    <DepartmentTab />
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

function fetchData(store){
    //console.log('fetch')
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    useAccountStore.setState({account: null})
    axios({
        url: `${apiUrl}/account`
    })
    .then( response => {
        //console.log(response.data)
        useAccountStore.setState({account: response.data.account})
        useAccountStore.setState({refresh: false})
    })
    .catch( error => {
        console.error(error)
    })
}

export default Account;