import { useState } from 'react'
import { Badge, Button, Card, Col, Modal, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'

const statusBadge = (approval) => {
    if (!approval) return <Badge bg='secondary'>Draf</Badge>
    if (approval.status === 'approved') return <Badge bg='success'>Diluluskan</Badge>
    if (approval.status === 'rejected') return <Badge bg='danger'>Ditolak</Badge>
    return <Badge bg='warning' text='dark'>Menunggu Kelulusan</Badge>
}

const AgihanViewModal = ({ mohonId, referenceNo }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    const [show, setShow] = useState(false)
    const [mohon, setMohon] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleOpen = () => {
        setShow(true)
        setLoading(true)
        axios(`${apiUrl}/admin/agihan/${mohonId}`)
            .then(res => setMohon(res.data.mohon))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const handleClose = () => {
        setShow(false)
        setMohon(null)
    }

    const activeAgihan = mohon?.mohon_distribution_requests?.[0]
    const approval = activeAgihan?.mohon_distribution_approvals?.[0] ?? null
    const agihanItems = activeAgihan?.mohon_distribution_items ?? []

    return (
        <>
            <Button size='sm' variant='outline-info' onClick={handleOpen}>
                <FontAwesomeIcon icon='fas fa-truck' className='me-1' />
                Agihan
            </Button>

            <Modal size='xl' show={show} onHide={handleClose} enforceFocus={false} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Mohon Agihan untuk Mohon{' '}
                        <small className='text-muted'>{mohon?.reference_no ?? referenceNo}</small>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {loading || !mohon
                        ? <p className='text-muted text-center py-5'>Memuatkan...</p>
                        : (
                            <>
                                {/* Mohon Info */}
                                <div className='mb-4'>
                                    <h6 className='text-uppercase text-muted mb-2'>Maklumat Mohon</h6>
                                    <Table size='sm' borderless className='mb-0' style={{ maxWidth: 480 }}>
                                        <tbody>
                                            <tr>
                                                <td className='text-muted' style={{ width: 160 }}>No. Rujukan</td>
                                                <td className='fw-semibold'>{mohon.reference_no ?? `#${mohon.id}`}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-muted'>Pemohon</td>
                                                <td>{mohon.user?.name ?? '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-muted'>Jabatan</td>
                                                <td>{mohon.user?.user_profile?.user_department?.name ?? '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-muted'>Status Agihan</td>
                                                <td>{statusBadge(approval)}</td>
                                            </tr>
                                            {approval?.boss && (
                                                <tr>
                                                    <td className='text-muted'>Pelulus</td>
                                                    <td>{approval.boss.name}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>

                                {/* Agihan Items */}
                                <div>
                                    <h6 className='text-uppercase text-muted mb-2'>
                                        Peralatan untuk Agihan ({agihanItems.length} unit)
                                    </h6>
                                    {agihanItems.length === 0
                                        ? <p className='text-muted small'>Tiada peralatan.</p>
                                        : (
                                            <Row className='g-2'>
                                                {agihanItems.map((item, index) => (
                                                    <Col xs={12} md={6} lg={4} key={index}>
                                                        <Card className='h-100 shadow-sm'>
                                                            <Card.Header className='d-flex align-items-center justify-content-between py-2'>
                                                                <strong>{item.category?.name}</strong>
                                                                <Badge
                                                                    bg={item.type === 'new' ? 'success' : 'warning'}
                                                                    text={item.type === 'new' ? undefined : 'dark'}
                                                                >
                                                                    {item.type === 'new' ? 'Baharu' : 'Ganti'}
                                                                </Badge>
                                                            </Card.Header>
                                                            <Card.Body className='py-2 px-3'>
                                                                <InfoRow label='Penerima' value={item.mohon_item?.name} />
                                                                <InfoRow label='Jawatan' value={item.mohon_item?.occupation} />
                                                                <InfoRow label='Bangunan' value={item.mohon_item?.building_name} />
                                                                <InfoRow label='Tingkat' value={item.mohon_item?.building_level} />
                                                                <InfoRow label='Lokasi' value={item.mohon_item?.location} />
                                                                <InfoRow label='Vendor' value={item.inventory?.vendor} />
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Tutup</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const InfoRow = ({ label, value }) => (
    <div className='d-flex justify-content-between mb-1' style={{ fontSize: '0.85rem' }}>
        <span className='text-muted'>{label}</span>
        <span className='fw-semibold text-end ms-2'>{value ?? '-'}</span>
    </div>
)

export default AgihanViewModal
