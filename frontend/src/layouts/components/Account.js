import React from 'react'
import { Nav, Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuthStore from '../../pages/Auth/stores/AuthStore'

const Account = () => {
    const store = useAuthStore()
    const user = store?.user

    // Helper function to format role name
    const formatRole = (role) => {
        const roleMap = {
            'user': 'Pengguna',
            'manager': 'Pengurus',
            'admin': 'Admin',
            'boss': 'Bos',
            'system': 'Sistem',
            'guest': 'Tetamu'
        }
        return roleMap[role] || role
    }

    // Helper function to get role icon
    const getRoleIcon = (role) => {
        const iconMap = {
            'user': 'fa-solid fa-user',
            'manager': 'fa-solid fa-people-group',
            'admin': 'fa-solid fa-shield',
            'boss': 'fa-solid fa-crown',
            'system': 'fa-solid fa-gears',
            'guest': 'fa-solid fa-user-slash'
        }
        return iconMap[role] || 'fa-solid fa-user'
    }

    // Helper function to format NRIC as XXXXXX-XX-XXXX
    const formatNRIC = (nric) => {
        if (!nric) return ''
        // Remove any existing hyphens
        const cleaned = nric.replace(/-/g, '')
        // Add hyphens in the correct positions
        return cleaned.replace(/(\d{6})(\d{2})(\d{4})/, '$1-$2-$3')
    }

    return (
        <Nav className='ms-auto'>
            <Dropdown>
                <Dropdown.Toggle
                    as={Nav.Link}
                    id='user-dropdown'
                    className='d-flex align-items-center'
                    style={{ cursor: 'pointer', border: 'none', padding: 0 }}
                >
                    <FontAwesomeIcon icon='fa-solid fa-circle-user' size='lg' className='text-secondary' />
                </Dropdown.Toggle>

                <Dropdown.Menu align='end'>
                    <Dropdown.Header>
                        <div className='fw-semibold'>{formatNRIC(user?.nric)}</div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        as={NavLink}
                        to='/account'
                        className='text-dark'
                        style={{ transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-user' className='me-2' />
                        Profil Saya
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        as={NavLink}
                        to='/sign-out'
                        className='text-danger'
                        style={{ transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <FontAwesomeIcon icon='fa-solid fa-sign-out-alt' className='me-2' />
                        Keluar
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    )
}

export default Account
