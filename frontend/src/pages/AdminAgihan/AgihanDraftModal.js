import { useState } from 'react'
import { Badge, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import axios from '../../libs/axios'

const AgihanDraftModal = ({ mohonId, referenceNo, onDelete }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()

    // Core
    const [show, setShow] = useState(false)
    const [mohon, setMohon] = useState(null)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)

    // Inline vendor (step 1)
    const [selectingItemId, setSelectingItemId] = useState(null)
    const [inlineVendors, setInlineVendors] = useState([])
    const [inlineVendorLoading, setInlineVendorLoading] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [removingItemId, setRemovingItemId] = useState(null)

    // Delete confirm (step 1)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Step 2
    const [bosses, setBosses] = useState([])
    const [bossId, setBossId] = useState('')
    const [justification, setJustification] = useState('')
    const [acknowledge, setAcknowledge] = useState(false)
    const [isApplying, setIsApplying] = useState(false)

    const fetchMohon = () =>
        axios(`${apiUrl}/admin/agihan/${mohonId}`)
            .then(res => { setMohon(res.data.mohon); return res.data.mohon })

    const handleOpen = async () => {
        setShow(true)
        setLoading(true)
        setMohon(null)
        setStep(1)
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
        if (isApplying || isDeleting) return
        setShow(false)
        setMohon(null)
        setStep(1)
        setSelectingItemId(null)
        setConfirmDelete(false)
        setBossId('')
        setJustification('')
        setAcknowledge(false)
    }

    // ── Derived state ───────────────────────────────────────────────
    const agihanItems = mohon?.mohon_distribution_requests?.flatMap(req =>
        req.mohon_distribution_items ?? []
    ) ?? []

    const activeAgihan = mohon?.mohon_distribution_requests?.[0]
    const activeAgihanId = activeAgihan?.id
    const isDraf = !activeAgihan?.mohon_distribution_approvals?.some(a => a.step >= 1)
    const getAgihanItem = (mohonItemId) => agihanItems.find(a => a.mohon_item_id === mohonItemId)
    const canNext = isDraf && agihanItems.length > 0 && agihanItems.every(i => i.inventory?.vendor)
    const canSubmit = bossId && acknowledge && justification.trim()

    // ── Step 1 handlers ─────────────────────────────────────────────
    const handlePilih = (item) => {
        setSelectingItemId(item.id)
        setInlineVendors([])
        setInlineVendorLoading(true)
        axios(`${apiUrl}/admin/agihan/vendors/${item.category?.id}`)
            .then(res => setInlineVendors(res.data.vendors))
            .catch(() => setInlineVendors([]))
            .finally(() => setInlineVendorLoading(false))
    }

    const handleVendorSelect = (val, item) => {
        if (!val) return
        setIsAdding(true)
        axios.post(`${apiUrl}/admin/mohon-distribution-items/${activeAgihanId}/create`, {
            itemId: item.id,
            mohon_item_id: item.id,
            category_name: item.category?.name || '',
            category_id: item.category?.id || '',
            vendor: val,
            type: '',
        })
            .then(() => fetchMohon())
            .then(() => setSelectingItemId(null))
            .catch(err => console.error(err))
            .finally(() => setIsAdding(false))
    }

    const handleBuang = (item) => {
        setRemovingItemId(item.id)
        axios.post(`${apiUrl}/admin/mohon-distribution-items/${activeAgihanId}/remove`, { itemId: item.id })
            .then(() => fetchMohon())
            .catch(err => console.error(err))
            .finally(() => setRemovingItemId(null))
    }

    // ── Step transition ─────────────────────────────────────────────
    const handleNextStep = () => {
        setBosses([])
        setBossId('')
        setJustification('')
        setAcknowledge(false)
        axios(`${apiUrl}/admin/mohon-distribution/${activeAgihanId}`)
            .then(res => setBosses(res.data.bossUsers))
            .catch(err => console.error(err))
        setStep(2)
    }

    const handleBack = () => {
        setStep(1)
        setBossId('')
        setJustification('')
        setAcknowledge(false)
    }

    // ── Step 2 submit ───────────────────────────────────────────────
    const handleSubmit = () => {
        setIsApplying(true)
        const formData = new FormData()
        formData.append('boss_id', bossId)
        formData.append('message', justification)
        formData.append('acknowledge', true)
        formData.append('_method', 'post')
        axios({
            method: 'post',
            url: `${apiUrl}/admin/mohon-distribution-approvals/${activeAgihanId}`,
            data: formData,
        })
            .then(() => {
                handleClose()
                navigate('/admin/agihan?tab=menunggu')
            })
            .catch(err => console.error(err))
            .finally(() => setIsApplying(false))
    }

    // ── Delete ──────────────────────────────────────────────────────
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
                <FontAwesomeIcon icon='fas fa-truck' className='me-1' />
                Mohon Agihan
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
                                {/* ── Progress Stepper ─────────────────────────────── */}
                                <div className='d-flex align-items-center mb-4'>
                                    <div
                                        className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
                                        style={{
                                            width: 32, height: 32,
                                            backgroundColor: step === 1 ? '#0d6efd' : '#198754',
                                            cursor: step === 2 ? 'pointer' : 'default',
                                        }}
                                        onClick={step === 2 ? handleBack : undefined}
                                    >
                                        {step === 1 ? '1' : <FontAwesomeIcon icon='fas fa-check' />}
                                    </div>
                                    <span
                                        className={`ms-2 ${step === 1 ? 'fw-semibold' : 'text-muted'}`}
                                        style={{ cursor: step === 2 ? 'pointer' : 'default' }}
                                        onClick={step === 2 ? handleBack : undefined}
                                    >
                                        Cadangan Agihan
                                    </span>

                                    <div className='flex-grow-1 mx-3' style={{ height: 2, backgroundColor: step === 2 ? '#198754' : '#dee2e6' }} />

                                    <div
                                        className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
                                        style={{ width: 32, height: 32, backgroundColor: step === 2 ? '#0d6efd' : '#6c757d' }}
                                    >
                                        2
                                    </div>
                                    <span className={`ms-2 ${step === 2 ? 'fw-semibold' : 'text-muted'}`}>
                                        Hantar untuk Kelulusan
                                    </span>

                                    <div className='flex-grow-1 mx-3' style={{ height: 2, backgroundColor: '#dee2e6' }} />

                                    <div
                                        className='d-flex align-items-center justify-content-center rounded-circle text-white fw-bold flex-shrink-0'
                                        style={{ width: 32, height: 32, backgroundColor: '#6c757d' }}
                                    >
                                        3
                                    </div>
                                    <span className='ms-2 text-muted'>Kelulusan Boss</span>
                                </div>

                                {/* ── Step 1: Cadangan Agihan ──────────────────────── */}
                                {step === 1 && (
                                    <>
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 40 }}>No.</th>
                                                    <th>Pemohon</th>
                                                    <th>Peralatan</th>
                                                    <th>Vendor</th>
                                                    <th className='text-center' style={{ width: 110 }}>Tindakan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mohon.mohon_items?.length === 0 && (
                                                    <tr><td colSpan={5} className='text-center text-muted py-3'>Tiada peralatan.</td></tr>
                                                )}
                                                {mohon.mohon_items?.map((item, index) => {
                                                    const agihanItem = getAgihanItem(item.id)
                                                    const inAgihan = !!agihanItem
                                                    const isSelecting = selectingItemId === item.id
                                                    const isRemoving = removingItemId === item.id

                                                    let rowClass = ''
                                                    if (inAgihan) rowClass = 'table-success'
                                                    else if (isSelecting) rowClass = 'table-warning'

                                                    return (
                                                        <tr key={item.id} className={rowClass}>
                                                            <td className='text-center align-middle'>{index + 1}</td>
                                                            <td className='align-middle'>{item.name}</td>
                                                            <td className='align-middle'>{item.category?.name}</td>
                                                            <td className='align-middle'>
                                                                {inAgihan && (
                                                                    <span>{agihanItem.inventory?.vendor ?? '-'}</span>
                                                                )}
                                                                {isSelecting && (
                                                                    inlineVendorLoading
                                                                        ? <span className='text-muted small'>Memuatkan...</span>
                                                                        : inlineVendors.length === 0
                                                                            ? <span className='text-danger small'>Tiada vendor</span>
                                                                            : (
                                                                                <Form.Select
                                                                                    size='sm'
                                                                                    disabled={isAdding}
                                                                                    defaultValue=''
                                                                                    onChange={e => handleVendorSelect(e.target.value, item)}
                                                                                >
                                                                                    <option value=''>-- Pilih Vendor --</option>
                                                                                    {inlineVendors.map(v => (
                                                                                        <option key={v.id} value={v.id}>
                                                                                            {v.vendor} ({v.contract_number})
                                                                                        </option>
                                                                                    ))}
                                                                                </Form.Select>
                                                                            )
                                                                )}
                                                                {!inAgihan && !isSelecting && '-'}
                                                            </td>
                                                            <td className='text-center align-middle'>
                                                                {inAgihan && (
                                                                    <Button
                                                                        size='sm'
                                                                        variant='outline-danger'
                                                                        disabled={isRemoving || !isDraf}
                                                                        onClick={() => handleBuang(item)}
                                                                    >
                                                                        {isRemoving
                                                                            ? <FontAwesomeIcon icon='fas fa-spinner' spin />
                                                                            : <FontAwesomeIcon icon='fas fa-times' />
                                                                        }
                                                                    </Button>
                                                                )}
                                                                {isSelecting && (
                                                                    <Button
                                                                        size='sm'
                                                                        variant='outline-secondary'
                                                                        disabled={isAdding}
                                                                        onClick={() => setSelectingItemId(null)}
                                                                    >
                                                                        Batal
                                                                    </Button>
                                                                )}
                                                                {!inAgihan && !isSelecting && (
                                                                    <Button
                                                                        size='sm'
                                                                        variant='outline-primary'
                                                                        disabled={!isDraf}
                                                                        onClick={() => handlePilih(item)}
                                                                    >
                                                                        Pilih
                                                                    </Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                        <p className='text-muted small'>
                                            {agihanItems.length} / {mohon.mohon_items?.length} peralatan dipilih
                                        </p>
                                    </>
                                )}

                                {/* ── Step 2: Hantar untuk Kelulusan ──────────────── */}
                                {step === 2 && (
                                    <>
                                        <div className='mb-3'>
                                            <h6>Maklumat Pelulus</h6>
                                            <Form.Select
                                                value={bossId}
                                                onChange={e => setBossId(e.target.value)}
                                                disabled={isApplying}
                                            >
                                                <option value=''>-- Sila Pilih Pelulus --</option>
                                                {bosses.map(b => (
                                                    <option key={b.id} value={b.id}>{b.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>

                                        <div className='mb-3'>
                                            <h6>Maklumat Agihan ({agihanItems.length} unit)</h6>
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
                                        </div>

                                        <div className='mb-3'>
                                            <h6>Justifikasi</h6>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                value={justification}
                                                onChange={e => setJustification(e.target.value)}
                                                placeholder='Sila lengkapkan justifikasi agihan'
                                                disabled={isApplying}
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )
                    }
                </Modal.Body>

                {!loading && mohon && isDraf && activeAgihanId && (
                    <Modal.Footer>
                        {step === 1 && (
                            confirmDelete ? (
                                <>
                                    <span className='text-danger small me-auto'>
                                        Padam agihan ini? Tindakan tidak boleh dibuat balik.
                                    </span>
                                    <Button variant='secondary' onClick={() => setConfirmDelete(false)} disabled={isDeleting}>
                                        Tidak
                                    </Button>
                                    <Button variant='danger' onClick={handleDelete} disabled={isDeleting}>
                                        {isDeleting
                                            ? <><FontAwesomeIcon icon='fas fa-spinner' spin className='me-1' />Memadam...</>
                                            : 'Ya, Padam'
                                        }
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {agihanItems.length > 0 && (
                                        <Button variant='outline-danger' className='me-auto' onClick={() => setConfirmDelete(true)}>
                                            <FontAwesomeIcon icon='fas fa-trash' className='me-1' />
                                            Padam Agihan
                                        </Button>
                                    )}
                                    <Button variant='primary' disabled={!canNext} onClick={handleNextStep}>
                                        Seterusnya <FontAwesomeIcon icon='fas fa-chevron-right' />
                                    </Button>
                                </>
                            )
                        )}

                        {step === 2 && (
                            <>
                                <Form.Check
                                    className='me-auto'
                                    reverse
                                    disabled={isApplying}
                                    label='Saya mengesahkan telah memeriksa permohonan ini'
                                    type='checkbox'
                                    checked={acknowledge}
                                    onChange={e => setAcknowledge(e.target.checked)}
                                />
                                <Button variant='secondary' onClick={handleBack} disabled={isApplying}>
                                    <FontAwesomeIcon icon='fas fa-arrow-left' className='me-1' />
                                    Undur
                                </Button>
                                <Button variant='primary' disabled={!canSubmit || isApplying} onClick={handleSubmit}>
                                    {isApplying
                                        ? <><FontAwesomeIcon icon='fas fa-spinner' spin className='me-1' />Menghantar...</>
                                        : 'Mohon Agihan'
                                    }
                                </Button>
                            </>
                        )}
                    </Modal.Footer>
                )}
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

export default AgihanDraftModal
