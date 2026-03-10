import { useEffect, useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import axios from '../../libs/axios'
import CreateUserModal from './components/Modal/CreateUserModal'
import UserTable from './components/UserTable'
import NewRegistration from './components/NewRegistration'

const TABS = [
    { key: 'approve',  label: 'Tidak Aktif' },
    { key: 'user',     label: 'Pengguna' },
    { key: 'admin',    label: 'Admin' },
    { key: 'manager',  label: 'Pelulus 1' },
    { key: 'boss',     label: 'Pelulus 2' },
]

const User = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const [tab, setTab] = useState('approve')
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        axios({ method: 'get', url: `${apiUrl}/global/user-departments` })
            .then(response => setDepartments(response.data.user_departments))
    }, [])

    return (
        <Container>
            <h4 className='mb-1'>Pengguna</h4>
            <p className='text-muted'>Pengurusan akaun pengguna sistem.</p>
            <hr />

            <div className='d-flex justify-content-between align-items-center mb-3'>
                <Nav variant='tabs'>
                    {TABS.map(t => (
                        <Nav.Item key={t.key}>
                            <Nav.Link
                                active={tab === t.key}
                                onClick={() => setTab(t.key)}
                                style={{ cursor: 'pointer' }}
                            >
                                {t.label}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
                <CreateUserModal />
            </div>

            {tab === 'approve'
                ? <NewRegistration departments={departments} />
                : <UserTable role={tab} departments={departments} />
            }
        </Container>
    )
}

export default User
