import { useState } from 'react'
import { Badge, Button, Col, Modal, Row, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../../libs/axios'

const ROLE_LABELS = {
    user:    'Pengguna',
    admin:   'Admin',
    manager: 'Pelulus 1',
    boss:    'Pelulus 2',
    system:  'Sistem',
}

function InfoRow({ label, value }) {
    return (
        <Row className='mb-2'>
            <Col xs={5} className='text-muted' style={{ fontSize: '0.9rem' }}>{label}</Col>
            <Col xs={7} style={{ fontSize: '0.9rem' }}><strong>{value ?? '-'}</strong></Col>
        </Row>
    )
}

function ShowUserModal({ id }) {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleShow = () => {
        setShow(true)
        setLoading(true)
        axios({ method: 'get', url: `${apiUrl}/admin/users/${id}` })
            .then(response => {
                setUser(response.data.user)
                setLoading(false)
            })
            .catch(err => { console.warn(err); setLoading(false) })
    }

    const handleClose = () => {
        setShow(false)
        setUser(null)
    }

    return (
        <>
            <Button size='sm' variant='outline-primary' onClick={handleShow} title='Lihat'>
                <FontAwesomeIcon icon='fa-solid fa-eye' />
            </Button>

            <Modal show={show} onHide={handleClose} size='md'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '1rem' }}>Maklumat Pengguna</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && (
                        <div className='text-center py-4'>
                            <Spinner animation='border' size='sm' />
                        </div>
                    )}
                    {!loading && user && (
                        <>
                            {/* Akaun */}
                            <p className='fw-semibold mb-2' style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888' }}>Akaun</p>
                            <InfoRow label='Nama Penuh' value={user.name} />
                            <InfoRow label='NRIC' value={user.nric} />
                            <InfoRow label='Emel' value={user.email} />
                            <InfoRow
                                label='Peranan'
                                value={
                                    <Badge bg='primary'>
                                        {ROLE_LABELS[user.role] ?? user.role}
                                    </Badge>
                                }
                            />
                            <InfoRow
                                label='Status Akaun'
                                value={
                                    user.is_approved
                                        ? <Badge bg='success'>Aktif</Badge>
                                        : <Badge bg='secondary'>Tidak Aktif</Badge>
                                }
                            />
                            <InfoRow
                                label='Pengesahan Emel'
                                value={
                                    user.email_verified_at
                                        ? <Badge bg='success'>Disahkan</Badge>
                                        : <Badge bg='warning' text='dark'>Belum Disahkan</Badge>
                                }
                            />

                            <hr className='my-3' />

                            {/* Profil */}
                            <p className='fw-semibold mb-2' style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888' }}>Profil</p>
                            <InfoRow label='Jawatan' value={user.profile?.occupation} />
                            <InfoRow label='No. Telefon' value={user.profile?.phone} />
                            <InfoRow label='Aras' value={user.profile?.level} />
                            <InfoRow label='Bangunan' value={user.profile?.building} />
                            <InfoRow label='Alamat' value={user.profile?.address} />

                            <hr className='my-3' />

                            {/* Jabatan */}
                            <p className='fw-semibold mb-2' style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888' }}>Jabatan</p>
                            <InfoRow label='Nama Jabatan' value={user.profile?.user_department?.name} />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' size='sm' onClick={handleClose}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShowUserModal
