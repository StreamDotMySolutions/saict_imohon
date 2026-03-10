import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col, Form, Modal, Nav, Row, Tab, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'
import ShowAgihan from '../Reporting/show'

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
    const [activeTab, setActiveTab] = useState('agihan')
    const printRef = useRef(null)

    // Delivery
    const [deliveryItem, setDeliveryItem] = useState(null)
    const [deliveryForm, setDeliveryForm] = useState({ pic_name: '', pic_phone: '', date_start: '', date_end: '' })
    const [deliveryErrors, setDeliveryErrors] = useState(null)
    const [deliveryAck, setDeliveryAck] = useState(false)
    const [isSavingDelivery, setIsSavingDelivery] = useState(false)

    const fetchMohon = () =>
        axios(`${apiUrl}/admin/agihan/${mohonId}`)
            .then(res => setMohon(res.data.mohon))
            .catch(err => console.error(err))

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
        setActiveTab('agihan')
    }

    const handlePrint = () => {
        const content = printRef.current?.innerHTML
        if (!content) return
        const win = window.open('', '_blank')
        win.document.write(`
            <html>
            <head>
                <title>Laporan Permohonan</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
                <style>
                    body { padding: 24px; font-size: 13px; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>${content}</body>
            </html>
        `)
        win.document.close()
        win.focus()
        win.print()
        win.close()
    }

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

    const activeAgihan = mohon?.mohon_distribution_requests?.[0]
    const approval = activeAgihan?.mohon_distribution_approvals?.[0] ?? null
    const agihanItems = activeAgihan?.mohon_distribution_items ?? []
    const isApproved = approval?.status === 'approved'

    return (
        <>
            <Button size='sm' variant='outline-info' onClick={handleOpen}>
                <FontAwesomeIcon icon='fas fa-truck' className='me-1' />
                Agihan
            </Button>

            {/* ── Main Modal ─────────────────────────────────────────── */}
            <Modal size='xl' show={show} onHide={handleClose} enforceFocus={false} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Mohon Agihan untuk Mohon{' '}
                        <small className='text-muted'>{mohon?.reference_no ?? referenceNo}</small>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                        <Nav variant='tabs' className='mb-3'>
                            <Nav.Item>
                                <Nav.Link eventKey='agihan'>
                                    <FontAwesomeIcon icon='fas fa-truck' className='me-1' />
                                    Agihan
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='laporan'>
                                    <FontAwesomeIcon icon='fas fa-file-lines' className='me-1' />
                                    Laporan
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* ── Tab: Agihan ── */}
                            <Tab.Pane eventKey='agihan'>
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
                                                      
                                                    </tbody>
                                                </Table>
                                            </div>

                                            {/* Agihan Items */}
                                            <div>
                                                <h6 className='text-uppercase text-muted mb-2'>
                                                    Peralatan untuk Agihan ({agihanItems.length} unit)
                                                    {isApproved && (
                                                        <span className='ms-2 text-success fw-normal' style={{ fontSize: '0.8rem' }}>
                                                            — tetapkan maklumat penghantaran setiap peralatan
                                                        </span>
                                                    )}
                                                </h6>
                                                {agihanItems.length === 0
                                                    ? <p className='text-muted small'>Tiada peralatan.</p>
                                                    : (
                                                        <Row className='g-2'>
                                                            {agihanItems.map((item, index) => {
                                                                const delivery = item.mohon_distribution_item_delivery
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
                                                                                    {delivery ? (
                                                                                        <>
                                                                                            <div className='d-flex justify-content-between align-items-center mb-1'>
                                                                                                <small className='text-success fw-semibold'>
                                                                                                    <FontAwesomeIcon icon='fas fa-circle-check' className='me-1' />
                                                                                                    Penghantaran ditetapkan
                                                                                                </small>
                                                                                                <Button size='sm' variant='outline-secondary' style={{ fontSize: '0.75rem', padding: '1px 6px' }} onClick={() => handleDeliveryOpen(item)}>
                                                                                                    Edit
                                                                                                </Button>
                                                                                            </div>
                                                                                            <InfoRow label='PIC' value={delivery.pic_name} />
                                                                                            <InfoRow label='Tel. PIC' value={delivery.pic_phone} />
                                                                                            <InfoRow label='Tarikh Mula' value={delivery.date_start} />
                                                                                            <InfoRow label='Tarikh Tamat' value={delivery.date_end} />
                                                                                        </>
                                                                                    ) : (
                                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                                            <Badge bg='warning' text='dark'>
                                                                                                <FontAwesomeIcon icon='fas fa-clock' className='me-1' />
                                                                                                Belum ditetapkan
                                                                                            </Badge>
                                                                                            <Button size='sm' variant='outline-primary' onClick={() => handleDeliveryOpen(item)}>
                                                                                                Set Penghantaran
                                                                                            </Button>
                                                                                        </div>
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
                                            </div>
                                        </>
                                    )
                                }
                            </Tab.Pane>

                            {/* ── Tab: Laporan ── */}
                            <Tab.Pane eventKey='laporan'>
                                <div ref={printRef}>
                                    <ShowAgihan mohonRequestId={mohonId} />
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Modal.Body>

                <Modal.Footer>
                    {activeTab === 'laporan' && (
                        <Button variant='outline-secondary' size='sm' onClick={handlePrint}>
                            <FontAwesomeIcon icon='fas fa-print' className='me-1' />Cetak
                        </Button>
                    )}
                    {isApproved && activeAgihan && (
                        <Link
                            to={`/mohon-distribution-items/${activeAgihan.id}`}
                            className='btn btn-sm btn-outline-secondary'
                            onClick={handleClose}
                        >
                            <FontAwesomeIcon icon='fas fa-arrow-up-right-from-square' className='me-1' />
                            Urus Agihan Penuh
                        </Link>
                    )}
                    <Button variant='secondary' onClick={handleClose}>Tutup</Button>
                </Modal.Footer>
            </Modal>

            {/* ── Delivery Modal ─────────────────────────────────────── */}
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
