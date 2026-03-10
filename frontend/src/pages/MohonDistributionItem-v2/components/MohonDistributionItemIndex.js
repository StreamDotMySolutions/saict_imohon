import { useState, useEffect } from 'react'
import { Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../../libs/axios'

const statusBadge = (approval) => {
    if (!approval) return <Badge bg='secondary'>Draf</Badge>
    if (approval.status === 'approved') return <Badge bg='success'>Diluluskan</Badge>
    if (approval.status === 'rejected') return <Badge bg='danger'>Ditolak</Badge>
    return <Badge bg='warning' text='dark'>Menunggu Kelulusan</Badge>
}

const MohonDistributionItemIndex = ({ agihanRequestId }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    const [mohon, setMohon] = useState(null)
    const [loading, setLoading] = useState(false)

    // Delivery modal
    const [deliveryItem, setDeliveryItem] = useState(null)
    const [deliveryForm, setDeliveryForm] = useState({ pic_name: '', pic_phone: '', date_start: '', date_end: '' })
    const [deliveryErrors, setDeliveryErrors] = useState(null)
    const [deliveryAck, setDeliveryAck] = useState(false)
    const [isSavingDelivery, setIsSavingDelivery] = useState(false)

    const fetchMohon = () => {
        setLoading(true)
        axios(`${apiUrl}/admin/mohon-distribution/${agihanRequestId}`)
            .then(res => setMohon(res.data.mohon))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchMohon()
    }, [agihanRequestId])

    const handleDeliveryOpen = (item) => {
        const d = item.mohon_distribution_item_delivery
        setDeliveryForm({
            pic_name: d?.pic_name ?? '',
            pic_phone: d?.pic_phone ?? '',
            date_start: d?.date_start ?? '',
            date_end: d?.date_end ?? '',
        })
        setDeliveryErrors(null)
        setDeliveryAck(false)
        setDeliveryItem(item)
    }

    const handleDeliverySubmit = () => {
        setIsSavingDelivery(true)
        const formData = new FormData()
        formData.append('pic_name', deliveryForm.pic_name)
        formData.append('pic_phone', deliveryForm.pic_phone)
        formData.append('date_start', deliveryForm.date_start)
        formData.append('date_end', deliveryForm.date_end)
        formData.append('acknowledge', deliveryAck ? 1 : 0)
        axios.post(`${apiUrl}/admin/mohon-distribution-item-deliveries/${deliveryItem.id}`, formData)
            .then(() => {
                setDeliveryItem(null)
                fetchMohon()
            })
            .catch(err => {
                if (err.response?.status === 422) setDeliveryErrors(err.response.data.errors)
            })
            .finally(() => setIsSavingDelivery(false))
    }

    const approval = mohon?.mohon_distribution_approval
    const items = mohon?.mohon_distribution_items ?? []
    const isApproved = approval?.status === 'approved'

    if (loading || !mohon) {
        return <p className='text-muted text-center py-5'>Memuatkan...</p>
    }

    return (
        <Container>
            {/* Summary */}
            <div className='mb-4'>
                <h6 className='text-uppercase text-muted mb-2'>Maklumat Agihan</h6>
                <Table size='sm' borderless className='mb-0' style={{ maxWidth: 480 }}>
                    <tbody>
                        <tr>
                            <td className='text-muted' style={{ width: 160 }}>No. Rujukan</td>
                            <td className='fw-semibold'>{mohon.reference_no ?? `#${mohon.id}`}</td>
                        </tr>
                        <tr>
                            <td className='text-muted'>Pemohon</td>
                            <td>{mohon.mohon_request?.user?.name ?? '-'}</td>
                        </tr>
                        <tr>
                            <td className='text-muted'>Jabatan</td>
                            <td>{mohon.mohon_request?.user?.user_profile?.user_department?.name ?? '-'}</td>
                        </tr>
                        <tr>
                            <td className='text-muted'>Status</td>
                            <td>{statusBadge(approval)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {/* Item Cards */}
            <h6 className='text-uppercase text-muted mb-2'>
                Peralatan ({items.length} unit)
                {isApproved && (
                    <span className='ms-2 text-success fw-normal' style={{ fontSize: '0.8rem' }}>
                        — tetapkan maklumat penghantaran setiap peralatan
                    </span>
                )}
            </h6>
            {items.length === 0
                ? <p className='text-muted small'>Tiada peralatan.</p>
                : (
                    <Row className='g-2'>
                        {items.map((item, index) => {
                            const delivery = item.mohon_distribution_item_delivery
                            const acceptance = item.mohon_distribution_item_acceptance
                            return (
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

                                        {isApproved && (
                                            <Card.Footer className='py-2 px-3'>
                                                {/* Penghantaran */}
                                                <div className='text-muted fw-semibold mb-1 text-uppercase' style={{ fontSize: '0.72rem' }}>
                                                    Penghantaran
                                                </div>
                                                {delivery ? (
                                                    <>
                                                        <div className='d-flex justify-content-between align-items-center mb-1'>
                                                            <small className='text-success fw-semibold'>
                                                                <FontAwesomeIcon icon='fas fa-circle-check' className='me-1' />
                                                                Penghantaran ditetapkan
                                                            </small>
                                                            <Button
                                                                size='sm'
                                                                variant='outline-secondary'
                                                                style={{ fontSize: '0.75rem', padding: '1px 6px' }}
                                                                onClick={() => handleDeliveryOpen(item)}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </div>
                                                        <InfoRow label='PIC' value={delivery.pic_name} />
                                                        <InfoRow label='Tel. PIC' value={delivery.pic_phone} />
                                                        <InfoRow label='Tarikh Mula' value={delivery.date_start} />
                                                        <InfoRow label='Tarikh Tamat' value={delivery.date_end} />
                                                    </>
                                                ) : (
                                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                                        <Badge bg='warning' text='dark'>
                                                            <FontAwesomeIcon icon='fas fa-clock' className='me-1' />
                                                            Belum ditetapkan
                                                        </Badge>
                                                        <Button size='sm' variant='outline-primary' onClick={() => handleDeliveryOpen(item)}>
                                                            Set Penghantaran
                                                        </Button>
                                                    </div>
                                                )}

                                                {/* Penerimaan */}
                                                <hr className='my-2' />
                                                <div className='text-muted fw-semibold mb-1 text-uppercase' style={{ fontSize: '0.72rem' }}>
                                                    Penerimaan
                                                </div>
                                                {acceptance ? (
                                                    <>
                                                        <small className='text-success fw-semibold'>
                                                            <FontAwesomeIcon icon='fas fa-circle-check' className='me-1' />
                                                            Diterima
                                                        </small>
                                                        <InfoRow label='Tarikh Pasang' value={acceptance.installation_date} />
                                                        <InfoRow label='PIC' value={acceptance.pic_name} />
                                                        <InfoRow label='Tel. PIC' value={acceptance.pic_phone} />
                                                    </>
                                                ) : (
                                                    <small className='text-muted'>Belum diterima</small>
                                                )}
                                            </Card.Footer>
                                        )}
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                )
            }

            {/* Delivery Modal */}
            <Modal show={!!deliveryItem} onHide={() => !isSavingDelivery && setDeliveryItem(null)} centered enforceFocus={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon='fas fa-truck' className='me-2' />
                        Maklumat Penghantaran
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-muted small mb-3'>
                        {deliveryItem?.category?.name} — {deliveryItem?.mohon_item?.name}
                    </p>

                    <Form.Group className='mb-2'>
                        <Form.Label className='small fw-semibold'>Nama PIC Vendor</Form.Label>
                        <Form.Control
                            size='sm'
                            value={deliveryForm.pic_name}
                            onChange={e => setDeliveryForm(f => ({ ...f, pic_name: e.target.value }))}
                            isInvalid={!!deliveryErrors?.pic_name}
                            disabled={isSavingDelivery}
                        />
                        <Form.Control.Feedback type='invalid'>{deliveryErrors?.pic_name?.[0]}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Label className='small fw-semibold'>No. Telefon PIC</Form.Label>
                        <Form.Control
                            size='sm'
                            value={deliveryForm.pic_phone}
                            onChange={e => setDeliveryForm(f => ({ ...f, pic_phone: e.target.value }))}
                            isInvalid={!!deliveryErrors?.pic_phone}
                            disabled={isSavingDelivery}
                        />
                        <Form.Control.Feedback type='invalid'>{deliveryErrors?.pic_phone?.[0]}</Form.Control.Feedback>
                    </Form.Group>

                    <Row className='g-2 mb-3'>
                        <Col>
                            <Form.Group>
                                <Form.Label className='small fw-semibold'>Tarikh Mula</Form.Label>
                                <Form.Control
                                    type='date'
                                    size='sm'
                                    value={deliveryForm.date_start}
                                    onChange={e => setDeliveryForm(f => ({ ...f, date_start: e.target.value }))}
                                    isInvalid={!!deliveryErrors?.date_start}
                                    disabled={isSavingDelivery}
                                />
                                <Form.Control.Feedback type='invalid'>{deliveryErrors?.date_start?.[0]}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className='small fw-semibold'>Tarikh Tamat</Form.Label>
                                <Form.Control
                                    type='date'
                                    size='sm'
                                    value={deliveryForm.date_end}
                                    onChange={e => setDeliveryForm(f => ({ ...f, date_end: e.target.value }))}
                                    isInvalid={!!deliveryErrors?.date_end}
                                    disabled={isSavingDelivery}
                                />
                                <Form.Control.Feedback type='invalid'>{deliveryErrors?.date_end?.[0]}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Check
                        label='Saya mengesahkan maklumat penghantaran ini adalah betul'
                        checked={deliveryAck}
                        onChange={e => setDeliveryAck(e.target.checked)}
                        disabled={isSavingDelivery}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setDeliveryItem(null)} disabled={isSavingDelivery}>
                        Batal
                    </Button>
                    <Button variant='primary' onClick={handleDeliverySubmit} disabled={!deliveryAck || isSavingDelivery}>
                        {isSavingDelivery
                            ? <><FontAwesomeIcon icon='fas fa-spinner' spin className='me-1' />Menyimpan...</>
                            : <><FontAwesomeIcon icon='fas fa-floppy-disk' className='me-1' />Simpan</>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

const InfoRow = ({ label, value }) => (
    <div className='d-flex justify-content-between mb-1' style={{ fontSize: '0.85rem' }}>
        <span className='text-muted'>{label}</span>
        <span className='fw-semibold text-end ms-2'>{value ?? '-'}</span>
    </div>
)

export default MohonDistributionItemIndex
