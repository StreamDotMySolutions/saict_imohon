import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Alert, Badge, Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import axios from '../../libs/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequestApprovalModal from '../MohonDistributionItem-v2/modals/RequestApprovalModal'

const AdminAgihanShow = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const { mohonId } = useParams()
    const navigate = useNavigate()
    const [mohon, setMohon] = useState(null)

    // Vendor modal state
    const [modalItem, setModalItem] = useState(null)
    const [vendors, setVendors] = useState([])
    const [vendorLoading, setVendorLoading] = useState(false)
    const [selectedVendor, setSelectedVendor] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Delete modal state
    const [showDelete, setShowDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchMohon = () =>
        axios(`${apiUrl}/admin/agihan/${mohonId}`)
            .then(response => setMohon(response.data.mohon))
            .catch(error => console.warn(error))

    useEffect(() => { fetchMohon() }, [mohonId])

    if (!mohon) return <Container><p className='text-muted mt-4'>Memuatkan...</p></Container>

    // Flatten all distribution items across all distribution requests
    const agihanItems = mohon.mohon_distribution_requests?.flatMap(req =>
        (req.mohon_distribution_items ?? []).map(item => ({
            ...item,
            _referenceNo: req.reference_no ?? `#${req.id}`,
            _approval: req.mohon_distribution_approvals?.[0] ?? null,
        }))
    ) ?? []

    // Active agihan = most recent distribution request (ordered DESC)
    const activeAgihan = mohon.mohon_distribution_requests?.[0]
    const activeAgihanId = activeAgihan?.id
    const isDraf = (activeAgihan?.mohon_distribution_approvals?.length ?? 0) === 0

    const isInAgihan = (mohonItemId) =>
        agihanItems.some(a => a.mohon_item_id === mohonItemId)

    // Hantar enabled only when ≥1 item and all have vendor
    const canSubmit = isDraf && agihanItems.length > 0 &&
        agihanItems.every(i => i.inventory?.vendor)

    // --- Vendor modal ---
    const handleCheckboxClick = (item) => {
        if (isInAgihan(item.id)) return
        setModalItem(item)
        setSelectedVendor('')
        setVendors([])
        setVendorLoading(true)
        axios(`${apiUrl}/admin/agihan/vendors/${item.category?.id}`)
            .then(res => setVendors(res.data.vendors))
            .catch(() => setVendors([]))
            .finally(() => setVendorLoading(false))
    }

    const handleVendorModalClose = () => { if (!isSubmitting) setModalItem(null) }

    const handleVendorSubmit = () => {
        if (!selectedVendor || !activeAgihanId) return
        setIsSubmitting(true)
        const payload = {
            itemId: modalItem.id,
            mohon_item_id: modalItem.id,
            category_name: modalItem.category?.name || '',
            category_id: modalItem.category?.id || '',
            vendor: selectedVendor,
            type: '',
        }
        axios.post(`${apiUrl}/admin/mohon-distribution-items/${activeAgihanId}/create`, payload)
            .then(() => fetchMohon())
            .then(() => setModalItem(null))
            .catch(err => console.error(err))
            .finally(() => setIsSubmitting(false))
    }

    // --- Delete ---
    const handleDelete = () => {
        if (!activeAgihanId) return
        setIsDeleting(true)
        axios.delete(`${apiUrl}/admin/mohon-distribution-requests/${activeAgihanId}`)
            .then(() => navigate('/admin/agihan'))
            .catch(err => console.error(err))
            .finally(() => setIsDeleting(false))
    }

    // --- Helpers ---
    const approvalBadge = (approval) => {
        if (!approval) return <Badge bg='secondary'>Draf</Badge>
        if (approval.status === 'approved') return <Badge bg='success'>Diluluskan</Badge>
        if (approval.status === 'rejected') return <Badge bg='danger'>Ditolak</Badge>
        return <Badge bg='warning' text='dark'>Menunggu</Badge>
    }

    return (
        <Container fluid>
            <div className='mb-1'>
                <Link to='/admin/agihan'>
                    <Button variant='link' size='sm' className='p-0 text-muted'>
                        <FontAwesomeIcon icon='fas fa-arrow-left' /> Agihan
                    </Button>
                </Link>
            </div>

            <h5 className='mb-0'>{mohon.reference_no ?? `#${mohon.id}`}</h5>
            <p className='text-muted mb-3'>
                Pemohon: {mohon.user?.name}
                {mohon.user?.user_profile?.user_department?.name &&
                    <> &mdash; {mohon.user.user_profile.user_department.name}</>
                }
            </p>
            <hr />

            <Row>
                {/* Left — Senarai Peralatan Dipohon */}
                <Col md={6}>
                    <h6 className='text-uppercase text-muted mb-2'>Senarai Peralatan Dipohon</h6>
                    <Table hover bordered size='sm'>
                        <thead className='table-light'>
                            <tr>
                                <th style={{ width: 40 }}>No.</th>
                                <th>Pemohon</th>
                                <th>Peralatan</th>
                                <th>Lokasi</th>
                                <th className='text-center' style={{ width: 60 }}>Pilih</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mohon.mohon_items?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className='text-center text-muted py-3'>Tiada peralatan.</td>
                                </tr>
                            )}
                            {mohon.mohon_items?.map((item, index) => {
                                const inAgihan = isInAgihan(item.id)
                                return (
                                    <tr key={item.id} className={inAgihan ? 'table-success' : ''}>
                                        <td className='text-center align-middle'>{index + 1}</td>
                                        <td className='align-middle'>{item.name}</td>
                                        <td className='align-middle'>{item.category?.name}</td>
                                        <td className='align-middle'>
                                            {item.building_name ?? '-'}
                                            {item.building_level && ` (Tkt ${item.building_level})`}
                                        </td>
                                        <td className='text-center align-middle'>
                                            <Form.Check
                                                checked={inAgihan}
                                                disabled={inAgihan || !isDraf}
                                                onChange={() => handleCheckboxClick(item)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <p className='text-muted small'>{mohon.mohon_items?.length} peralatan</p>
                </Col>

                {/* Right — Senarai Cadangan Agihan */}
                <Col md={6}>
                    <h6 className='text-uppercase text-muted mb-2'>Senarai Cadangan Agihan</h6>
                    <Table hover bordered size='sm'>
                        <thead className='table-light'>
                            <tr>
                                <th style={{ width: 40 }}>No.</th>
                                <th>Pemohon</th>
                                <th>Peralatan</th>
                                <th>Vendor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agihanItems.length === 0 && (
                                <tr>
                                    <td colSpan={5} className='text-center text-muted py-3'>Tiada cadangan agihan.</td>
                                </tr>
                            )}
                            {agihanItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td className='text-center align-middle'>{index + 1}</td>
                                    <td className='align-middle'>{item.mohon_item?.name ?? '-'}</td>
                                    <td className='align-middle'>{item.category?.name ?? '-'}</td>
                                    <td className='align-middle'>{item.inventory?.vendor ?? '-'}</td>
                                    <td className='align-middle'>{approvalBadge(item._approval)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p className='text-muted small'>{agihanItems.length} peralatan dicadang</p>
                </Col>
            </Row>

            {/* Action Bar — only shown while still draf */}
            {isDraf && activeAgihanId && (
                <div className='d-flex justify-content-between align-items-center border-top pt-3 mt-3'>
                    <Button
                        variant='outline-danger'
                        onClick={() => setShowDelete(true)}
                    >
                        <FontAwesomeIcon icon='fas fa-trash' className='me-2' />
                        Padam Agihan
                    </Button>

                    {canSubmit
                        ? <RequestApprovalModal agihanRequestId={activeAgihanId} />
                        : <Button variant='info' disabled>
                            Hantar untuk Kelulusan
                          </Button>
                    }
                </div>
            )}

            {/* Vendor Selection Modal */}
            <Modal show={!!modalItem} onHide={handleVendorModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Pilih Vendor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className='table table-sm table-borderless mb-3'>
                        <tbody>
                            <tr>
                                <th className='text-muted fw-normal' style={{ width: 100 }}>Pemohon</th>
                                <td>{modalItem?.name}</td>
                            </tr>
                            <tr>
                                <th className='text-muted fw-normal'>Peralatan</th>
                                <td>{modalItem?.category?.name}</td>
                            </tr>
                        </tbody>
                    </table>

                    {vendorLoading && (
                        <p className='text-muted small'>Memuatkan vendor...</p>
                    )}
                    {!vendorLoading && vendors.length === 0 && (
                        <Alert variant='warning' className='mb-0'>
                            <FontAwesomeIcon icon='fas fa-triangle-exclamation' className='me-2' />
                            Vendor tiada untuk peralatan ini.
                        </Alert>
                    )}
                    {!vendorLoading && vendors.length > 0 && (
                        <Form.Group>
                            <Form.Label className='fw-semibold'>Vendor</Form.Label>
                            <Form.Select
                                value={selectedVendor}
                                onChange={e => setSelectedVendor(e.target.value)}
                                disabled={isSubmitting}
                            >
                                <option value=''>-- Pilih Vendor --</option>
                                {vendors.map(v => (
                                    <option key={v.id} value={v.id}>
                                        {v.vendor} ({v.contract_number})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleVendorModalClose} disabled={isSubmitting}>
                        Batal
                    </Button>
                    {vendors.length > 0 && (
                        <Button
                            variant='success'
                            onClick={handleVendorSubmit}
                            disabled={!selectedVendor || isSubmitting}
                        >
                            {isSubmitting ? 'Menambah...' : 'Tambah'}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDelete} onHide={() => !isDeleting && setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Padam Agihan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='mb-1'>Anda pasti mahu padam agihan ini?</p>
                    <p className='text-muted small mb-0'>
                        Semua peralatan yang telah dipilih akan dibuang. Tindakan ini tidak boleh dibuat balik.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => setShowDelete(false)}
                        disabled={isDeleting}
                    >
                        Batal
                    </Button>
                    <Button
                        variant='danger'
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting
                            ? <><FontAwesomeIcon icon='fas fa-spinner' spin className='me-1' />Memadam...</>
                            : <><FontAwesomeIcon icon='fas fa-trash' className='me-1' />Ya, Padam</>
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AdminAgihanShow
