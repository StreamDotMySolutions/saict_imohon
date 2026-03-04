import { useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../libs/axios'
import RequestApprovalModal from '../MohonDistributionItem-v2/modals/RequestApprovalModal'

const AgihanDraftModal = ({ mohonId, referenceNo, onDelete }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL

    const [show, setShow] = useState(false)
    const [mohon, setMohon] = useState(null)
    const [loading, setLoading] = useState(false)

    // Vendor modal
    const [modalItem, setModalItem] = useState(null)
    const [vendors, setVendors] = useState([])
    const [vendorLoading, setVendorLoading] = useState(false)
    const [selectedVendor, setSelectedVendor] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Remove item
    const [removingItemId, setRemovingItemId] = useState(null)

    // Delete inline confirm
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchMohon = () =>
        axios(`${apiUrl}/admin/agihan/${mohonId}`)
            .then(res => { setMohon(res.data.mohon); return res.data.mohon })

    const handleOpen = async () => {
        setShow(true)
        setLoading(true)
        setMohon(null)
        try {
            const res = await axios(`${apiUrl}/admin/agihan/${mohonId}`)
            const mohonData = res.data.mohon
            const latestReq = mohonData.mohon_distribution_requests?.[0]

            if (!latestReq) {
                await axios.post(`${apiUrl}/admin/mohon-distribution-requests/${mohonId}`, {
                    title: 'Mohon Agihan',
                    description: 'Admin memohon agihan',
                })
                await fetchMohon()
            } else {
                setMohon(mohonData)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        if (isSubmitting || isDeleting) return
        setShow(false)
        setMohon(null)
    }

    // ── Derived state ──────────────────────────────────────────────
    const agihanItems = mohon?.mohon_distribution_requests?.flatMap(req =>
        req.mohon_distribution_items ?? []
    ) ?? []

    const activeAgihan = mohon?.mohon_distribution_requests?.[0]
    const activeAgihanId = activeAgihan?.id
    const isDraf = !activeAgihan?.mohon_distribution_approvals?.some(a => a.step >= 1)
    const canSubmit = isDraf && agihanItems.length > 0 && agihanItems.every(i => i.inventory?.vendor)
    const isInAgihan = (mohonItemId) => agihanItems.some(a => a.mohon_item_id === mohonItemId)

    // ── Vendor modal ───────────────────────────────────────────────
    const handleCheckboxClick = (item) => {
        if (isInAgihan(item.id)) {
            setRemovingItemId(item.id)
            axios.post(`${apiUrl}/admin/mohon-distribution-items/${activeAgihanId}/remove`, { itemId: item.id })
                .then(() => fetchMohon())
                .catch(err => console.error(err))
                .finally(() => setRemovingItemId(null))
            return
        }
        setModalItem(item)
        setSelectedVendor('')
        setVendors([])
        setVendorLoading(true)
        axios(`${apiUrl}/admin/agihan/vendors/${item.category?.id}`)
            .then(res => setVendors(res.data.vendors))
            .catch(() => setVendors([]))
            .finally(() => setVendorLoading(false))
    }

    const handleVendorSubmit = () => {
        if (!selectedVendor || !activeAgihanId) return
        setIsSubmitting(true)
        axios.post(`${apiUrl}/admin/mohon-distribution-items/${activeAgihanId}/create`, {
            itemId: modalItem.id,
            mohon_item_id: modalItem.id,
            category_name: modalItem.category?.name || '',
            category_id: modalItem.category?.id || '',
            vendor: selectedVendor,
            type: '',
        })
            .then(() => fetchMohon())
            .then(() => setModalItem(null))
            .catch(err => console.error(err))
            .finally(() => setIsSubmitting(false))
    }

    // ── Delete ─────────────────────────────────────────────────────
    const handleDelete = () => {
        if (!activeAgihanId) return
        setIsDeleting(true)
        const formData = new FormData()
        formData.append('_method', 'delete')
        axios({
            method: 'post',
            url: `${apiUrl}/admin/mohon-distribution-requests/${activeAgihanId}`,
            data: formData,
        })
            .then(() => {
                setConfirmDelete(false)
                setShow(false)
                setMohon(null)
                onDelete?.()
            })
            .catch(err => console.error(err))
            .finally(() => setIsDeleting(false))
    }

    return (
        <>
            <Button size='sm' variant='success' onClick={handleOpen}>
                <FontAwesomeIcon icon='fas fa-boxes-stacked' className='me-1' />
                Mohon Agihan
            </Button>

            {/* ── Main Agihan Modal ──────────────────────────────── */}
            <Modal size='xl' show={show} onHide={handleClose} enforceFocus={false} scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>{mohon?.reference_no ?? referenceNo}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {loading || !mohon
                        ? <p className='text-muted text-center py-5'>Memuatkan...</p>
                        : (
                            <>
                            {/* ── Progress Steps ─────────────────────────────── */}
                            <div className='d-flex align-items-center mb-4'>
                                {/* Step 1 */}
                                <div
                                    className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
                                    style={{ width: 32, height: 32, backgroundColor: isDraf ? '#0d6efd' : '#198754' }}
                                >
                                    {isDraf ? '1' : <FontAwesomeIcon icon='fas fa-check' />}
                                </div>
                                <span className={`ms-2 ${isDraf ? 'fw-semibold' : 'text-muted'}`}>Cadangan Agihan</span>

                                {/* Connector */}
                                <div
                                    className='flex-grow-1 mx-3'
                                    style={{ height: 2, backgroundColor: isDraf ? '#dee2e6' : '#198754' }}
                                />

                                {/* Step 2 */}
                                <div
                                    className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
                                    style={{ width: 32, height: 32, backgroundColor: isDraf ? '#6c757d' : '#0d6efd' }}
                                >
                                    2
                                </div>
                                <span className={`ms-2 ${!isDraf ? 'fw-semibold' : 'text-muted'}`}>Hantar untuk Kelulusan</span>
                            </div>

                            <Row>
                                {/* Left — Peralatan Dipohon */}
                                <Col md={6}>
                                    <h5>Senarai Peralatan Dipohon</h5>
                                    <Table className='border rounded mt-3' style={{ backgroundColor: '#f0f0f0' }}>
                                        <thead>
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
                                                <tr><td colSpan={5} className='text-center text-muted py-3'>Tiada peralatan.</td></tr>
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
                                                                disabled={!isDraf || removingItemId === item.id}
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

                                {/* Right — Cadangan Agihan */}
                                <Col md={6}>
                                    <h5>Senarai Cadangan Agihan</h5>
                                    <Table className='border rounded mt-3' style={{ backgroundColor: '#f0f0f0' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 40 }}>No.</th>
                                                <th>Pemohon</th>
                                                <th>Peralatan</th>
                                                <th>Vendor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {agihanItems.length === 0 && (
                                                <tr><td colSpan={5} className='text-center text-muted py-3'>Tiada cadangan agihan.</td></tr>
                                            )}
                                            {agihanItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className='text-center align-middle'>{index + 1}</td>
                                                    <td className='align-middle'>{item.mohon_item?.name ?? '-'}</td>
                                                    <td className='align-middle'>{item.category?.name ?? '-'}</td>
                                                    <td className='align-middle'>{item.inventory?.vendor ?? '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <p className='text-muted small'>{agihanItems.length} peralatan dicadang</p>
                                </Col>
                            </Row>
                            </>
                        )
                    }
                </Modal.Body>

                {!loading && mohon && isDraf && activeAgihanId && (
                    <Modal.Footer>
                        {confirmDelete && agihanItems.length > 0 ? (
                            <>
                                <span className='text-danger small me-auto'>
                                    Padam agihan ini? Tindakan tidak boleh dibuat balik.
                                </span>
                                <Button
                                    variant='secondary'
                                    onClick={() => setConfirmDelete(false)}
                                    disabled={isDeleting}
                                >
                                    Tidak
                                </Button>
                                <Button
                                    variant='danger'
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting
                                        ? <><FontAwesomeIcon icon='fas fa-spinner' spin className='me-1' />Memadam...</>
                                        : 'Ya, Padam'
                                    }
                                </Button>
                            </>
                        ) : (
                            <>
                                {agihanItems.length > 0 && (
                                    <Button variant='outline-danger' onClick={() => setConfirmDelete(true)}>
                                        <FontAwesomeIcon icon='fas fa-trash' className='me-1' />
                                        Padam Agihan
                                    </Button>
                                )}
                                {canSubmit
                                    ? <RequestApprovalModal agihanRequestId={activeAgihanId} onSuccess={handleClose} />
                                    : <Button variant='primary' disabled>Seterusnya <FontAwesomeIcon icon='fas fa-chevron-right' /></Button>
                                }
                            </>
                        )}
                    </Modal.Footer>
                )}
            </Modal>

            {/* ── Vendor Selection Modal ─────────────────────────── */}
            <Modal show={!!modalItem} onHide={() => !isSubmitting && setModalItem(null)} centered>
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

                    {vendorLoading && <p className='text-muted small'>Memuatkan vendor...</p>}

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
                    <Button variant='secondary' onClick={() => setModalItem(null)} disabled={isSubmitting}>
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

        </>
    )
}

export default AgihanDraftModal
